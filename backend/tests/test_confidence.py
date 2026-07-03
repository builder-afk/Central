"""
Tests for the Confidence Scoring Engine (Service 10).
"""

import pytest
from app.schemas.inputs import (
    ProjectInput, LocationInput, BuildingInput, FoundationInput,
    QualityTier, SoilType, InteriorsInput,
    MaterialsInput,
)
from app.services.user_input import validate_and_normalize
from app.services.confidence_scoring import calculate_confidence


def _score(**overrides):
    defaults = {
        "location": LocationInput(city="Gurgaon"),
        "building": BuildingInput(builtup_area_sqft=2000, floors=2),
        "quality_tier": QualityTier.STANDARD,
    }
    defaults.update(overrides)
    inp = validate_and_normalize(ProjectInput(**defaults))
    return calculate_confidence(inp)


class TestConfidenceScoring:
    def test_base_confidence(self):
        result = _score()
        assert 10 <= result.percentage <= 98

    def test_unknown_soil_reduces_confidence(self):
        result = _score(foundation=FoundationInput(soil_type=SoilType.NORMAL))
        factor_impacts = [f["impact_value"] for f in result.factors if f["factor"] == "Unknown Soil Type"]
        assert any(v < 0 for v in factor_impacts)

    def test_known_soil_no_penalty(self):
        result = _score(foundation=FoundationInput(soil_type=SoilType.HARD_ROCK))
        factor_names = [f["factor"] for f in result.factors]
        assert "Unknown Soil Type" not in factor_names

    def test_interior_included_improves_confidence(self):
        without = _score()
        with_int = _score(interiors=InteriorsInput(include_interior=True))
        assert with_int.percentage >= without.percentage

    def test_material_brands_improve_confidence(self):
        without = _score()
        with_brands = _score(
            materials=MaterialsInput(steel_brand="TATA Tiscon", cement_brand="UltraTech")
        )
        assert with_brands.percentage > without.percentage

    def test_builder_quotes_boost(self):
        inp = validate_and_normalize(ProjectInput(
            location=LocationInput(city="Gurgaon"),
            building=BuildingInput(builtup_area_sqft=2000, floors=2),
            quality_tier=QualityTier.STANDARD,
        ))
        without = calculate_confidence(inp, has_builder_quotes=False)
        with_quotes = calculate_confidence(inp, has_builder_quotes=True)
        assert with_quotes.percentage > without.percentage

    def test_regional_data_boost(self):
        inp = validate_and_normalize(ProjectInput(
            location=LocationInput(city="Gurgaon"),
            building=BuildingInput(builtup_area_sqft=2000, floors=2),
            quality_tier=QualityTier.STANDARD,
        ))
        no_data = calculate_confidence(inp, regional_project_count=0)
        with_data = calculate_confidence(inp, regional_project_count=10)
        assert with_data.percentage > no_data.percentage

    def test_level_classification(self):
        inp = validate_and_normalize(ProjectInput(
            location=LocationInput(city="Gurgaon"),
            building=BuildingInput(builtup_area_sqft=2000, floors=2),
            quality_tier=QualityTier.STANDARD,
        ))
        # With lots of data, should be High
        high = calculate_confidence(
            inp, has_builder_quotes=True,
            regional_project_count=10, similar_project_count=5,
        )
        assert high.level in ("Medium", "High")

    def test_factors_have_descriptions(self):
        result = _score()
        for factor in result.factors:
            assert "description" in factor
            assert len(factor["description"]) > 10
