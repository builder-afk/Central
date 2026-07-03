"""
Estimate response schemas.
Never outputs a single number — always range, confidence, breakdown, and insights.
"""

from pydantic import BaseModel
from typing import Optional


# ─── Sub-models ───

class CostRange(BaseModel):
    minimum: int
    most_likely: int
    maximum: int


class ConfidenceScore(BaseModel):
    percentage: int  # 0–100
    level: str  # Low, Medium, High
    factors: list[dict]  # [{"factor": "...", "impact": "+12%", "description": "..."}]


class BreakdownCategory(BaseModel):
    category: str
    amount: int
    percent: float
    depends_on: list[str]  # What this cost depends on


class CostBreakdown(BaseModel):
    foundation: BreakdownCategory
    structure: BreakdownCategory
    brickwork: BreakdownCategory
    roofing: BreakdownCategory
    electrical: BreakdownCategory
    plumbing: BreakdownCategory
    flooring: BreakdownCategory
    doors_windows: BreakdownCategory
    painting: BreakdownCategory
    interior_finishing: BreakdownCategory
    miscellaneous: BreakdownCategory


class QuantityEstimate(BaseModel):
    concrete_m3: float
    steel_kg: float
    brick_count: int
    plaster_area_sqft: float
    flooring_area_sqft: float
    paint_area_sqft: float
    tile_area_sqft: float
    electrical_points: int
    plumbing_fixtures: int
    window_area_sqft: float
    door_count: int
    boundary_wall_length_ft: Optional[float] = None
    landscape_area_sqft: Optional[float] = None


class RegionalFactors(BaseModel):
    city: str
    material_index: float
    labour_index: float
    approval_index: float
    inflation_index: float
    transportation_index: float
    availability_index: float


class AddOnCost(BaseModel):
    name: str
    amount: int
    included: bool


class AddOnCosts(BaseModel):
    basement: AddOnCost
    interior: AddOnCost
    landscaping: AddOnCost
    solar: AddOnCost
    ev_charging: AddOnCost
    boundary_wall: AddOnCost
    driveway: AddOnCost
    home_automation: AddOnCost


class BudgetTier(BaseModel):
    label: str
    amount: int
    description: str


class BudgetTiers(BaseModel):
    minimum: BudgetTier
    recommended: BudgetTier
    premium: BudgetTier


class ProfessionalFees(BaseModel):
    architect: int
    structural_engineer: int
    mep_consultant: int  # Mechanical/Electrical/Plumbing
    interior_designer: Optional[int] = None
    total: int
    percent_of_project: float


class GovernmentCharges(BaseModel):
    plan_approval: int
    noc_charges: int
    water_connection: int
    electricity_connection: int
    sewage_connection: int
    total: int


class ContingencyCost(BaseModel):
    percent: float
    amount: int
    reason: str


class BuilderMargin(BaseModel):
    percent_range: str  # "8–12%"
    estimated_amount: int


class SavingsOpportunity(BaseModel):
    area: str
    suggestion: str
    potential_savings: int


class BuilderRecommendation(BaseModel):
    builder_id: str
    name: str
    match_score: int  # 0–100
    reasons: list[str]
    estimated_rate: float


# ─── Main Response Model ───

class EstimateResponse(BaseModel):
    """
    Complete estimate response.
    Never a single number — always range, confidence, breakdown, and context.
    """

    # ─── Core estimate ───
    estimated_cost: int
    cost_range: CostRange
    cost_per_sqft: int

    # ─── Confidence ───
    confidence: ConfidenceScore

    # ─── Detailed breakdown ───
    breakdown: CostBreakdown
    quantities: QuantityEstimate
    regional_factors: RegionalFactors

    # ─── Add-ons ───
    add_on_costs: AddOnCosts
    total_add_ons: int

    # ─── Budget planning ───
    budget_tiers: BudgetTiers

    # ─── Fees & charges ───
    professional_fees: ProfessionalFees
    government_charges: GovernmentCharges
    contingency: ContingencyCost
    builder_margin: BuilderMargin

    # ─── Intelligence ───
    ai_insights: list[str]
    savings_opportunities: list[SavingsOpportunity]
    recommended_builders: list[BuilderRecommendation]

    # ─── Meta ───
    calculation_method: str  # "rule_engine", "ai_prediction", "hybrid"
    engine_version: str
