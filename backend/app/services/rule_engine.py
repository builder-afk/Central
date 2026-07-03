"""
Service 5 — Construction Rule Engine
Independent cost rules for EVERY category.
No single multiplier. Each category has its own computation logic
based on specific dependencies.
"""

from app.services.user_input import NormalizedInput
from app.services.quantity_estimation import QuantityTakeoff
from app.services.material_pricing import MaterialRates
from app.services.labour_pricing import LabourRates, calculate_total_labour_cost
from app.services.regional_pricing import RegionalIndices
from app.schemas.inputs import (
    SoilType, FoundationType, StructuralSystem, QualityTier, TimelineType, AutomationLevel,
    BrickType,
)


# ─── Soil difficulty multipliers ───
SOIL_MULTIPLIERS: dict[SoilType, float] = {
    SoilType.NORMAL: 1.0,
    SoilType.HARD_ROCK: 1.35,
    SoilType.SOFT_SOIL: 1.15,
    SoilType.BLACK_COTTON: 1.25,
    SoilType.SANDY: 1.10,
    SoilType.CLAY: 1.20,
}

# ─── Foundation type cost factors (₹/sqft of footprint) ───
FOUNDATION_COSTS: dict[FoundationType, dict[str, float]] = {
    FoundationType.STRIP: {"economy": 180, "standard": 220, "premium": 280, "luxury": 350, "ultra_luxury": 450},
    FoundationType.ISOLATED: {"economy": 200, "standard": 250, "premium": 320, "luxury": 400, "ultra_luxury": 520},
    FoundationType.RAFT: {"economy": 280, "standard": 350, "premium": 450, "luxury": 550, "ultra_luxury": 700},
    FoundationType.PILE: {"economy": 400, "standard": 500, "premium": 650, "luxury": 800, "ultra_luxury": 1000},
}

# ─── Structure cost (₹/sqft by structural system × quality) ───
STRUCTURE_COSTS: dict[StructuralSystem, dict[str, float]] = {
    StructuralSystem.LOAD_BEARING: {"economy": 350, "standard": 420, "premium": 520, "luxury": 650, "ultra_luxury": 800},
    StructuralSystem.RCC_FRAME: {"economy": 420, "standard": 520, "premium": 650, "luxury": 800, "ultra_luxury": 1000},
    StructuralSystem.STEEL_FRAME: {"economy": 500, "standard": 620, "premium": 780, "luxury": 950, "ultra_luxury": 1200},
    StructuralSystem.COMPOSITE: {"economy": 450, "standard": 560, "premium": 700, "luxury": 860, "ultra_luxury": 1080},
}

# ─── Interior cost (₹/sqft by quality) ───
INTERIOR_RATES: dict[str, float] = {
    "economy": 400,
    "standard": 700,
    "premium": 1200,
    "luxury": 2200,
    "ultra_luxury": 4000,
}

# ─── Automation cost (₹/sqft) ───
AUTOMATION_COSTS: dict[AutomationLevel, float] = {
    AutomationLevel.NONE: 0,
    AutomationLevel.BASIC: 80,
    AutomationLevel.ADVANCED: 250,
}

# ─── Professional fee percentages ───
PROFESSIONAL_FEE_PERCENT: dict[str, dict[str, float]] = {
    "architect": {"economy": 0.03, "standard": 0.04, "premium": 0.05, "luxury": 0.06, "ultra_luxury": 0.08},
    "structural": {"economy": 0.01, "standard": 0.015, "premium": 0.02, "luxury": 0.02, "ultra_luxury": 0.025},
    "mep": {"economy": 0.005, "standard": 0.01, "premium": 0.015, "luxury": 0.02, "ultra_luxury": 0.025},
}

# ─── Government charges base rates (₹) ───
GOV_CHARGES_BASE: dict[str, float] = {
    "plan_approval": 25000,
    "noc_charges": 15000,
    "water_connection": 8000,
    "electricity_connection": 12000,
    "sewage_connection": 6000,
}

# ─── Solar costs ───
SOLAR_COST_PER_KW: float = 55000

# ─── EV charging station ───
EV_CHARGING_COST: float = 85000

# ─── Driveway (₹/sqft by quality) ───
DRIVEWAY_RATES: dict[str, float] = {
    "economy": 40,
    "standard": 65,
    "premium": 100,
    "luxury": 160,
    "ultra_luxury": 280,
}

# ─── Landscape (₹/sqft by quality) ───
LANDSCAPE_RATES: dict[str, float] = {
    "economy": 30,
    "standard": 55,
    "premium": 100,
    "luxury": 180,
    "ultra_luxury": 350,
}

# ─── Pool cost (₹ flat by quality) ───
POOL_COSTS: dict[str, float] = {
    "economy": 0,
    "standard": 0,
    "premium": 400000,
    "luxury": 800000,
    "ultra_luxury": 1800000,
}


class CategoryCost:
    """Result for a single cost category."""
    def __init__(self, category: str, amount: int, depends_on: list[str]):
        self.category = category
        self.amount = amount
        self.depends_on = depends_on

    def to_dict(self) -> dict:
        return {
            "category": self.category,
            "amount": self.amount,
            "depends_on": self.depends_on,
        }


class RuleEngineResult:
    """Complete output from the rule engine."""
    def __init__(self):
        self.categories: dict[str, CategoryCost] = {}
        self.professional_fees: dict[str, int] = {}
        self.government_charges: dict[str, int] = {}
        self.contingency_amount: int = 0
        self.contingency_percent: float = 0
        self.builder_margin_amount: int = 0
        self.builder_margin_percent: float = 0
        self.add_ons: dict[str, dict] = {}

    @property
    def construction_cost(self) -> int:
        """Sum of all construction categories (excluding fees, charges, contingency)."""
        return sum(c.amount for c in self.categories.values())

    @property
    def total_professional_fees(self) -> int:
        return sum(self.professional_fees.values())

    @property
    def total_government_charges(self) -> int:
        return sum(self.government_charges.values())

    @property
    def total_add_ons(self) -> int:
        return sum(a.get("amount", 0) for a in self.add_ons.values() if a.get("included"))

    @property
    def grand_total(self) -> int:
        return (
            self.construction_cost +
            self.total_professional_fees +
            self.total_government_charges +
            self.total_add_ons +
            self.contingency_amount +
            self.builder_margin_amount
        )


def compute_all_categories(
    inp: NormalizedInput,
    quantities: QuantityTakeoff,
    material_rates: MaterialRates,
    labour_result: dict,
    indices: RegionalIndices,
) -> RuleEngineResult:
    """
    Service 5 entry point.
    Computes every cost category independently using its own rule set.
    """
    result = RuleEngineResult()
    quality = inp.quality.value.lower()

    # ─── 1. Foundation Cost ───
    # Depends on: soil, basement, foundation type, plot area
    foundation_base = FOUNDATION_COSTS.get(
        inp.foundation_type, FOUNDATION_COSTS[FoundationType.ISOLATED]
    ).get(quality, 250)
    soil_mult = SOIL_MULTIPLIERS.get(inp.soil_type, 1.0)
    foundation_area = inp.footprint_area
    if inp.include_basement:
        foundation_area += inp.basement_area * 0.5  # Basement increases foundation
    foundation_cost = int(foundation_area * foundation_base * soil_mult * indices.material_index)

    result.categories["foundation"] = CategoryCost(
        "Foundation & Structure Base",
        foundation_cost,
        ["soil_type", "foundation_type", "basement", "plot_area"],
    )

    # ─── 2. Structure Cost ───
    # Depends on: floors, ceiling height, structural system, builtup area
    structure_rate = STRUCTURE_COSTS.get(
        inp.structural_system, STRUCTURE_COSTS[StructuralSystem.RCC_FRAME]
    ).get(quality, 520)
    height_factor = max(1.0, inp.ceiling_height / 10.0)  # Taller ceilings cost more
    floor_factor = 1.0 + (inp.floors - 1) * 0.08  # Each additional floor adds ~8%
    structure_cost = int(
        inp.total_builtup * structure_rate * height_factor * floor_factor * indices.construction_index
    )

    result.categories["structure"] = CategoryCost(
        "Superstructure",
        structure_cost,
        ["floors", "ceiling_height", "structural_system", "builtup_area"],
    )

    # ─── 3. Brickwork Cost ───
    # Depends on: quantity × material rate
    brick_material = "aac_block" if inp.brick_type in (BrickType.AAC_BLOCK, BrickType.HOLLOW_BLOCK) else "brick"
    brick_rate = material_rates.get_rate(brick_material)
    brickwork_cost = int(quantities.brick_count * brick_rate)

    result.categories["brickwork"] = CategoryCost(
        "Brickwork / Blockwork",
        brickwork_cost,
        ["brick_type", "wall_area", "quality"],
    )

    # ─── 4. Roofing Cost ───
    # Depends on: builtup area, floors, quality
    roofing_rates = {"economy": 80, "standard": 120, "premium": 180, "luxury": 280, "ultra_luxury": 420}
    roofing_cost = int(inp.builtup_area * roofing_rates.get(quality, 120) * indices.material_index)

    result.categories["roofing"] = CategoryCost(
        "Roofing",
        roofing_cost,
        ["builtup_area", "quality"],
    )

    # ─── 5. Electrical Cost ───
    # Depends on: electrical points × rate
    electrical_rate = material_rates.get_rate("electrical")
    electrical_cost = int(quantities.electrical_points * electrical_rate)

    result.categories["electrical"] = CategoryCost(
        "Electrical",
        electrical_cost,
        ["room_count", "quality", "automation"],
    )

    # ─── 6. Plumbing Cost ───
    # Depends on: plumbing fixtures × rate
    plumbing_rate = material_rates.get_rate("plumbing")
    plumbing_cost = int(quantities.plumbing_fixtures * plumbing_rate)

    result.categories["plumbing"] = CategoryCost(
        "Plumbing",
        plumbing_cost,
        ["bathroom_count", "kitchen_count", "quality"],
    )

    # ─── 7. Flooring Cost ───
    # Depends on: flooring area × tile/flooring rate
    flooring_rate = material_rates.get_rate("tiles")
    flooring_cost = int(quantities.flooring_area_sqft * flooring_rate)

    result.categories["flooring"] = CategoryCost(
        "Flooring",
        flooring_cost,
        ["flooring_type", "area", "quality"],
    )

    # ─── 8. Doors & Windows Cost ───
    # Depends on: door count, window area, quality
    door_rates = {"economy": 4000, "standard": 8000, "premium": 15000, "luxury": 28000, "ultra_luxury": 50000}
    door_cost = quantities.door_count * door_rates.get(quality, 8000)
    window_rate = material_rates.get_rate("glass")
    window_cost = int(quantities.window_area_sqft * window_rate)
    doors_windows_cost = door_cost + window_cost

    result.categories["doors_windows"] = CategoryCost(
        "Doors & Windows",
        doors_windows_cost,
        ["door_count", "window_area", "quality", "type"],
    )

    # ─── 9. Painting Cost ───
    # Depends on: paint area × rate
    paint_rate = material_rates.get_rate("paint")
    painting_cost = int(quantities.paint_area_sqft * paint_rate)

    result.categories["painting"] = CategoryCost(
        "Painting",
        painting_cost,
        ["wall_area", "ceiling_area", "paint_type", "quality"],
    )

    # ─── 10. Interior Finishing Cost ───
    # Depends on: finish level, room count
    interior_rate = INTERIOR_RATES.get(quality, 700)
    interior_finishing_cost = int(inp.total_builtup * interior_rate * 0.3)  # 30% of area gets finishing

    result.categories["interior_finishing"] = CategoryCost(
        "Interior Finishing",
        interior_finishing_cost,
        ["finish_level", "room_count", "quality"],
    )

    # ─── 11. Miscellaneous ───
    # ~5% of construction cost
    misc_cost = int(result.construction_cost * 0.05)
    result.categories["miscellaneous"] = CategoryCost(
        "Miscellaneous",
        misc_cost,
        ["project_size", "complexity"],
    )

    # ─── Professional Fees ───
    total_construction = result.construction_cost
    for role, tier_pcts in PROFESSIONAL_FEE_PERCENT.items():
        pct = tier_pcts.get(quality, 0.04)
        result.professional_fees[role] = int(total_construction * pct)

    # Interior designer (only if interior is selected)
    if inp.include_interior:
        interior_designer_pct = {"economy": 0.02, "standard": 0.03, "premium": 0.04, "luxury": 0.05, "ultra_luxury": 0.06}
        result.professional_fees["interior_designer"] = int(
            total_construction * interior_designer_pct.get(quality, 0.03)
        )

    # ─── Government Charges ───
    for charge, base_amount in GOV_CHARGES_BASE.items():
        result.government_charges[charge] = int(base_amount * indices.approval_index)

    # ─── Add-ons ───
    # Basement
    basement_rate = {"economy": 1200, "standard": 1500, "premium": 2000, "luxury": 2800, "ultra_luxury": 4000}
    basement_cost = int(inp.basement_area * basement_rate.get(quality, 1500) * indices.construction_index) if inp.include_basement else 0
    result.add_ons["basement"] = {"name": "Basement", "amount": basement_cost, "included": inp.include_basement}

    # Interior package
    interior_pkg_cost = int(inp.total_builtup * INTERIOR_RATES.get(quality, 700)) if inp.include_interior else 0
    result.add_ons["interior"] = {"name": "Interior Package", "amount": interior_pkg_cost, "included": inp.include_interior}

    # Landscaping
    landscape_rate = LANDSCAPE_RATES.get(quality, 55)
    landscape_cost = int(quantities.landscape_area_sqft * landscape_rate) if inp.landscape else 0
    result.add_ons["landscaping"] = {"name": "Landscaping", "amount": landscape_cost, "included": inp.landscape}

    # Solar
    solar_cost = int(inp.solar_capacity_kw * SOLAR_COST_PER_KW) if inp.solar else 0
    result.add_ons["solar"] = {"name": "Solar Installation", "amount": solar_cost, "included": inp.solar}

    # EV Charging
    ev_cost = EV_CHARGING_COST if inp.ev_charging else 0
    result.add_ons["ev_charging"] = {"name": "EV Charging Station", "amount": ev_cost, "included": inp.ev_charging}

    # Boundary Wall
    wall_rate = {"economy": 350, "standard": 500, "premium": 700, "luxury": 1000, "ultra_luxury": 1500}
    bwall_cost = int(quantities.boundary_wall_area_sqft * wall_rate.get(quality, 500) * indices.material_index) if inp.boundary_wall else 0
    result.add_ons["boundary_wall"] = {"name": "Boundary Wall", "amount": bwall_cost, "included": inp.boundary_wall}

    # Driveway
    driveway_area = inp.plot_area * 0.1  # ~10% of plot
    driveway_rate = DRIVEWAY_RATES.get(quality, 65)
    driveway_cost = int(driveway_area * driveway_rate) if inp.driveway else 0
    result.add_ons["driveway"] = {"name": "Driveway", "amount": driveway_cost, "included": inp.driveway}

    # Home Automation
    auto_rate = AUTOMATION_COSTS.get(inp.automation_level, 0)
    auto_cost = int(inp.total_builtup * auto_rate) if auto_rate > 0 else 0
    result.add_ons["home_automation"] = {"name": "Home Automation", "amount": auto_cost, "included": auto_rate > 0}

    # ─── Contingency ───
    # Dynamic 5–10% based on unknowns
    unknowns = 0
    if inp.soil_type == SoilType.NORMAL:
        unknowns += 1  # Might be unknown
    if not inp.include_interior:
        unknowns += 1
    contingency_pct = 0.05 + (unknowns * 0.015)
    contingency_pct = min(contingency_pct, 0.10)
    result.contingency_percent = round(contingency_pct * 100, 1)
    result.contingency_amount = int(result.grand_total * contingency_pct)

    # ─── Builder Margin ───
    margin_pcts = {"economy": 0.08, "standard": 0.10, "premium": 0.12, "luxury": 0.14, "ultra_luxury": 0.16}
    margin_pct = margin_pcts.get(quality, 0.10)
    result.builder_margin_percent = round(margin_pct * 100, 1)
    result.builder_margin_amount = int(result.construction_cost * margin_pct)

    return result
