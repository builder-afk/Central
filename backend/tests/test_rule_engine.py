"""
Tests for the Construction Rule Engine (Service 5).
Verifies each cost category is computed independently with correct dependencies.
"""

import pytest
import asyncio
from app.schemas.inputs import (
    ProjectInput, LocationInput, BuildingInput, FoundationInput,
    QualityTier, SoilType, FoundationType, StructuralSystem,
)
from app.services.user_input import validate_and_normalize
from app.services.regional_pricing import get_regional_indices
from app.services.quantity_estimation import estimate_quantities
from app.services.material_pricing import get_material_rates
from app.services.labour_pricing import calculate_total_labour_cost
from app.services.rule_engine import compute_all_categories


def _make_input(**overrides) -> ProjectInput:
    """Helper to create a ProjectInput with defaults."""
    defaults = {
        "location": LocationInput(city="Gurgaon"),
        "building": BuildingInput(builtup_area_sqft=2000, floors=2),
        "quality_tier": QualityTier.STANDARD,
    }
    defaults.update(overrides)
    return ProjectInput(**defaults)


async def _compute_async(project_input: ProjectInput):
    """Run the full pipeline and return rule engine result."""
    inp = validate_and_normalize(project_input)
    quality = inp.quality.value.lower()
    indices = await get_regional_indices(inp.city)
    quantities = estimate_quantities(inp)
    material_rates = await get_material_rates(inp.city, quality, indices)
    labour_result = calculate_total_labour_cost(indices, inp.builtup_area, inp.floors, quality, inp.timeline)
    return compute_all_categories(inp, quantities, material_rates, labour_result, indices)

def _compute(project_input: ProjectInput):
    return asyncio.run(_compute_async(project_input))


class TestRuleEngineCategories:
    """Each cost category should be computed independently."""

    def test_all_categories_present(self):
        result = _compute(_make_input())
        expected = [
            "foundation", "structure", "brickwork", "roofing",
            "electrical", "plumbing", "flooring", "doors_windows",
            "painting", "interior_finishing", "miscellaneous",
        ]
        for cat in expected:
            assert cat in result.categories, f"Missing category: {cat}"

    def test_all_categories_have_positive_cost(self):
        result = _compute(_make_input())
        for name, cat in result.categories.items():
            assert cat.amount > 0, f"Category {name} has zero cost"

    def test_foundation_depends_on_soil(self):
        normal = _compute(_make_input(
            foundation=FoundationInput(soil_type=SoilType.NORMAL),
        ))
        rocky = _compute(_make_input(
            foundation=FoundationInput(soil_type=SoilType.HARD_ROCK),
        ))
        assert rocky.categories["foundation"].amount > normal.categories["foundation"].amount

    def test_structure_depends_on_floors(self):
        two_floors = _compute(_make_input(
            building=BuildingInput(builtup_area_sqft=2000, floors=2),
        ))
        four_floors = _compute(_make_input(
            building=BuildingInput(builtup_area_sqft=2000, floors=4),
        ))
        assert four_floors.categories["structure"].amount > two_floors.categories["structure"].amount

    def test_quality_affects_all_costs(self):
        economy = _compute(_make_input(quality_tier=QualityTier.ECONOMY))
        luxury = _compute(_make_input(quality_tier=QualityTier.LUXURY))
        assert luxury.construction_cost > economy.construction_cost * 1.5

    def test_professional_fees_present(self):
        result = _compute(_make_input())
        assert "architect" in result.professional_fees
        assert "structural" in result.professional_fees
        assert "mep" in result.professional_fees
        assert result.total_professional_fees > 0

    def test_government_charges_present(self):
        result = _compute(_make_input())
        assert "plan_approval" in result.government_charges
        assert result.total_government_charges > 0

    def test_contingency_is_dynamic(self):
        result = _compute(_make_input())
        assert 5.0 <= result.contingency_percent <= 10.0
        assert result.contingency_amount > 0

    def test_builder_margin_by_quality(self):
        economy = _compute(_make_input(quality_tier=QualityTier.ECONOMY))
        luxury = _compute(_make_input(quality_tier=QualityTier.LUXURY))
        assert luxury.builder_margin_percent > economy.builder_margin_percent

    def test_no_single_multiplier(self):
        """Verify that costs are NOT simply area × rate."""
        result = _compute(_make_input())
        total = result.construction_cost
        # If it were a single multiplier, all categories would be proportional
        # Check that categories have different ratios
        ratios = [c.amount / total for c in result.categories.values() if total > 0]
        assert len(set(round(r, 2) for r in ratios)) > 3, "Too few distinct ratios — might be a single multiplier"
