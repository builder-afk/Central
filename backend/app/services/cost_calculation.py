"""
Service 7 — Cost Calculation Engine (THE ORCHESTRATOR)
This is the central service that calls every other service
and assembles the final estimate.

Flow:
1. user_input.validate() → normalized inputs
2. regional_pricing.get_indices() → city indices
3. quantity_estimation.estimate() → physical quantities
4. material_pricing.get_rates() → unit costs
5. labour_pricing.calculate_total() → labour costs
6. rule_engine.compute_all() → category-wise costs
7. builder_intelligence.get_market_rates() → market context
8. ai_prediction.predict() → ML-adjusted estimate
9. confidence_scoring.score() → confidence + explanations
10. recommendation.match_builders() → builder suggestions
11. Assemble → EstimateResponse
"""

from app.schemas.inputs import ProjectInput
from app.schemas.outputs import (
    EstimateResponse, CostRange, ConfidenceScore, CostBreakdown,
    BreakdownCategory, QuantityEstimate, RegionalFactors, AddOnCosts,
    AddOnCost, BudgetTiers, BudgetTier, ProfessionalFees,
    GovernmentCharges, ContingencyCost, BuilderMargin,
    SavingsOpportunity, BuilderRecommendation,
)
from app.services.user_input import validate_and_normalize
from app.services.regional_pricing import get_regional_indices
from app.services.quantity_estimation import estimate_quantities
from app.services.material_pricing import get_material_rates
from app.services.labour_pricing import calculate_total_labour_cost
from app.services.rule_engine import compute_all_categories
from app.services.confidence_scoring import calculate_confidence
from app.services.builder_intelligence import get_market_rates
from app.services.ai_prediction import predict, generate_insights, generate_savings_opportunities
from app.services.recommendation import match_builders
from app.config import get_settings


async def compute_estimate(
    project_input: ProjectInput,
) -> EstimateResponse:
    """
    Service 7 entry point.
    The master orchestrator — assembles the complete estimate.
    """
    settings = get_settings()

    # ─── Step 1: Normalize inputs ───
    inp = validate_and_normalize(project_input)
    quality = inp.quality.value.lower()

    # ─── Step 2: Regional indices ───
    indices = await get_regional_indices(inp.city)

    # ─── Step 3: Quantity takeoff ───
    quantities = estimate_quantities(inp)

    # ─── Step 4: Material rates ───
    material_rates = await get_material_rates(inp.city, quality, indices)

    # ─── Step 5: Labour costs ───
    labour_result = calculate_total_labour_cost(
        indices, inp.builtup_area, inp.floors, quality, inp.timeline
    )

    # ─── Step 6: Rule engine ───
    rule_result = compute_all_categories(
        inp, quantities, material_rates, labour_result, indices
    )

    # ─── Step 7: Builder intelligence ───
    market_intel = await get_market_rates(inp.city, quality, "residential")

    # ─── Step 8: AI prediction ───
    prediction = predict(
        builtup_area=inp.builtup_area,
        floors=inp.floors,
        quality_tier=quality,
        city_construction_index=indices.construction_index,
        city_labour_index=indices.labour_index,
        city_material_index=indices.material_index,
        room_count=inp.total_rooms,
        include_basement=inp.include_basement,
        include_interior=inp.include_interior,
        rule_engine_estimate=float(rule_result.grand_total),
    )

    # ─── Step 9: Confidence scoring ───
    confidence = calculate_confidence(
        inp,
        has_builder_quotes=market_intel.sample_size > 0,
        regional_project_count=0,  # Would come from DB query
        similar_project_count=0,
    )

    # ─── Step 10: Builder recommendations ───
    builder_matches = await match_builders(
        inp.city, quality, prediction.most_likely, "residential"
    )

    # ─── Step 11: Assemble response ───

    estimated_cost = int(prediction.most_likely)
    total_builtup = int(inp.total_builtup)
    cost_per_sqft = estimated_cost // total_builtup if total_builtup > 0 else 0

    # Build breakdown
    def _make_category(key: str, fallback_label: str) -> BreakdownCategory:
        cat = rule_result.categories.get(key)
        if cat:
            total = rule_result.construction_cost or 1
            return BreakdownCategory(
                category=cat.category,
                amount=cat.amount,
                percent=round(cat.amount / total * 100, 1),
                depends_on=cat.depends_on,
            )
        return BreakdownCategory(category=fallback_label, amount=0, percent=0, depends_on=[])

    breakdown = CostBreakdown(
        foundation=_make_category("foundation", "Foundation"),
        structure=_make_category("structure", "Structure"),
        brickwork=_make_category("brickwork", "Brickwork"),
        roofing=_make_category("roofing", "Roofing"),
        electrical=_make_category("electrical", "Electrical"),
        plumbing=_make_category("plumbing", "Plumbing"),
        flooring=_make_category("flooring", "Flooring"),
        doors_windows=_make_category("doors_windows", "Doors & Windows"),
        painting=_make_category("painting", "Painting"),
        interior_finishing=_make_category("interior_finishing", "Interior Finishing"),
        miscellaneous=_make_category("miscellaneous", "Miscellaneous"),
    )

    # Quantities
    q = quantities.to_dict()
    quantity_estimate = QuantityEstimate(**q)

    # Regional factors
    regional = RegionalFactors(
        city=inp.city,
        material_index=indices.material_index,
        labour_index=indices.labour_index,
        approval_index=indices.approval_index,
        inflation_index=indices.inflation_index,
        transportation_index=indices.transportation_index,
        availability_index=indices.availability_index,
    )

    # Add-on costs
    def _make_addon(key: str) -> AddOnCost:
        a = rule_result.add_ons.get(key, {})
        return AddOnCost(
            name=a.get("name", key),
            amount=a.get("amount", 0),
            included=a.get("included", False),
        )

    add_ons = AddOnCosts(
        basement=_make_addon("basement"),
        interior=_make_addon("interior"),
        landscaping=_make_addon("landscaping"),
        solar=_make_addon("solar"),
        ev_charging=_make_addon("ev_charging"),
        boundary_wall=_make_addon("boundary_wall"),
        driveway=_make_addon("driveway"),
        home_automation=_make_addon("home_automation"),
    )

    # Budget tiers
    budget_tiers = BudgetTiers(
        minimum=BudgetTier(
            label="Minimum",
            amount=int(prediction.minimum),
            description="Bare minimum with potential compromises on finishing",
        ),
        recommended=BudgetTier(
            label="Recommended",
            amount=int(prediction.most_likely),
            description="Recommended budget with adequate quality and contingency",
        ),
        premium=BudgetTier(
            label="Premium",
            amount=int(prediction.maximum),
            description="Premium budget with best materials and finishes",
        ),
    )

    # Professional fees
    fees = rule_result.professional_fees
    total_fees = sum(fees.values())
    fee_pct = round(total_fees / rule_result.construction_cost * 100, 1) if rule_result.construction_cost > 0 else 0
    professional_fees = ProfessionalFees(
        architect=fees.get("architect", 0),
        structural_engineer=fees.get("structural", 0),
        mep_consultant=fees.get("mep", 0),
        interior_designer=fees.get("interior_designer"),
        total=total_fees,
        percent_of_project=fee_pct,
    )

    # Government charges
    gc = rule_result.government_charges
    government_charges = GovernmentCharges(
        plan_approval=gc.get("plan_approval", 0),
        noc_charges=gc.get("noc_charges", 0),
        water_connection=gc.get("water_connection", 0),
        electricity_connection=gc.get("electricity_connection", 0),
        sewage_connection=gc.get("sewage_connection", 0),
        total=sum(gc.values()),
    )

    # Contingency
    contingency = ContingencyCost(
        percent=rule_result.contingency_percent,
        amount=rule_result.contingency_amount,
        reason=f"Dynamic contingency at {rule_result.contingency_percent}% based on project unknowns",
    )

    # Builder margin
    builder_margin = BuilderMargin(
        percent_range=f"{rule_result.builder_margin_percent - 2:.0f}–{rule_result.builder_margin_percent + 2:.0f}%",
        estimated_amount=rule_result.builder_margin_amount,
    )

    # AI insights
    ai_insights = generate_insights(
        float(rule_result.grand_total), prediction, quality, inp.city
    )

    # Savings opportunities
    savings_raw = generate_savings_opportunities(
        {}, quality, inp.include_interior
    )
    savings = [SavingsOpportunity(**s) for s in savings_raw]

    # Builder recommendations
    recommendations = [
        BuilderRecommendation(**m.to_dict()) for m in builder_matches
    ]

    # Confidence
    conf = confidence.to_dict()
    confidence_score = ConfidenceScore(
        percentage=conf["percentage"],
        level=conf["level"],
        factors=conf["factors"],
    )

    return EstimateResponse(
        estimated_cost=estimated_cost,
        cost_range=CostRange(
            minimum=int(prediction.minimum),
            most_likely=int(prediction.most_likely),
            maximum=int(prediction.maximum),
        ),
        cost_per_sqft=cost_per_sqft,
        confidence=confidence_score,
        breakdown=breakdown,
        quantities=quantity_estimate,
        regional_factors=regional,
        add_on_costs=add_ons,
        total_add_ons=rule_result.total_add_ons,
        budget_tiers=budget_tiers,
        professional_fees=professional_fees,
        government_charges=government_charges,
        contingency=contingency,
        builder_margin=builder_margin,
        ai_insights=ai_insights,
        savings_opportunities=savings,
        recommended_builders=recommendations,
        calculation_method=prediction.method,
        engine_version=settings.APP_VERSION,
    )
