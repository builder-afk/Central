"""
Tests for the Cost Calculation Engine (Service 7 — Orchestrator).
Verifies the full end-to-end pipeline.
"""

import pytest
import asyncio
from app.schemas.inputs import (
    ProjectInput, LocationInput, BuildingInput, FoundationInput,
    QualityTier, SoilType, TimelineType,
    InteriorsInput, ExteriorInput,
)
from app.services.cost_calculation import compute_estimate


def _estimate(**overrides):
    defaults = {
        "location": LocationInput(city="Gurgaon"),
        "building": BuildingInput(builtup_area_sqft=2000, floors=2),
        "quality_tier": QualityTier.STANDARD,
    }
    defaults.update(overrides)
    return asyncio.run(compute_estimate(ProjectInput(**defaults)))


class TestEndToEndEstimate:
    def test_returns_complete_response(self):
        result = _estimate()
        assert result.estimated_cost > 0
        assert result.cost_range.minimum < result.cost_range.most_likely < result.cost_range.maximum
        assert result.cost_per_sqft > 0
        assert result.confidence.percentage > 0
        assert result.confidence.level in ("Low", "Medium", "High")

    def test_breakdown_has_all_categories(self):
        result = _estimate()
        assert result.breakdown.foundation.amount > 0
        assert result.breakdown.structure.amount > 0
        assert result.breakdown.electrical.amount > 0
        assert result.breakdown.plumbing.amount > 0
        assert result.breakdown.flooring.amount > 0

    def test_quantities_populated(self):
        result = _estimate()
        assert result.quantities.concrete_m3 > 0
        assert result.quantities.steel_kg > 0
        assert result.quantities.brick_count > 0
        assert result.quantities.electrical_points > 0

    def test_regional_factors_for_gurgaon(self):
        result = _estimate()
        assert result.regional_factors.city == "Gurgaon"
        assert result.regional_factors.labour_index > 1.0  # Gurgaon is above average

    def test_professional_fees_present(self):
        result = _estimate()
        assert result.professional_fees.total > 0
        assert result.professional_fees.architect > 0

    def test_government_charges_present(self):
        result = _estimate()
        assert result.government_charges.total > 0

    def test_contingency_present(self):
        result = _estimate()
        assert result.contingency.amount > 0
        assert 5.0 <= result.contingency.percent <= 10.0

    def test_budget_tiers(self):
        result = _estimate()
        assert result.budget_tiers.minimum.amount < result.budget_tiers.recommended.amount
        assert result.budget_tiers.recommended.amount < result.budget_tiers.premium.amount

    def test_ai_insights_present(self):
        result = _estimate()
        assert len(result.ai_insights) > 0


class TestCityComparison:
    def test_mumbai_costs_more_than_lucknow(self):
        mumbai = _estimate(location=LocationInput(city="Mumbai"))
        lucknow = _estimate(location=LocationInput(city="Lucknow"))
        assert mumbai.estimated_cost > lucknow.estimated_cost

    def test_bangalore_vs_hyderabad(self):
        blr = _estimate(location=LocationInput(city="Bangalore"))
        hyd = _estimate(location=LocationInput(city="Hyderabad"))
        assert blr.estimated_cost > hyd.estimated_cost  # Bangalore is pricier


class TestQualityTiers:
    def test_quality_ordering(self):
        economy = _estimate(quality_tier=QualityTier.ECONOMY)
        standard = _estimate(quality_tier=QualityTier.STANDARD)
        premium = _estimate(quality_tier=QualityTier.PREMIUM)
        luxury = _estimate(quality_tier=QualityTier.LUXURY)

        assert economy.estimated_cost < standard.estimated_cost
        assert standard.estimated_cost < premium.estimated_cost
        assert premium.estimated_cost < luxury.estimated_cost

    def test_cost_per_sqft_increases_with_quality(self):
        economy = _estimate(quality_tier=QualityTier.ECONOMY)
        luxury = _estimate(quality_tier=QualityTier.LUXURY)
        assert luxury.cost_per_sqft > economy.cost_per_sqft * 1.5


class TestAddOns:
    def test_interior_adds_cost(self):
        without = _estimate()
        with_int = _estimate(interiors=InteriorsInput(include_interior=True))
        assert with_int.estimated_cost > without.estimated_cost

    def test_solar_adds_cost(self):
        without = _estimate(exterior=ExteriorInput(solar=False))
        with_solar = _estimate(exterior=ExteriorInput(solar=True, solar_capacity_kw=5))
        assert with_solar.add_on_costs.solar.amount > 0
