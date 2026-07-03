"""
Tests for the Quantity Estimation Engine (Service 6).
Verifies physical quantity calculations.
"""

import pytest
from app.schemas.inputs import (
    ProjectInput, LocationInput, BuildingInput, FoundationInput,
    QualityTier, StructuralSystem, BrickType,
    MaterialsInput, ExteriorInput, RoomsInput,
)
from app.services.user_input import validate_and_normalize
from app.services.quantity_estimation import estimate_quantities


def _estimate(**overrides):
    defaults = {
        "location": LocationInput(city="Bangalore"),
        "building": BuildingInput(builtup_area_sqft=2000, floors=2),
        "quality_tier": QualityTier.STANDARD,
    }
    defaults.update(overrides)
    inp = validate_and_normalize(ProjectInput(**defaults))
    return estimate_quantities(inp)


class TestConcreteEstimation:
    def test_concrete_positive(self):
        q = _estimate()
        assert q.concrete_m3 > 0

    def test_concrete_scales_with_area(self):
        small = _estimate(building=BuildingInput(builtup_area_sqft=1000, floors=2))
        large = _estimate(building=BuildingInput(builtup_area_sqft=4000, floors=2))
        assert large.concrete_m3 > small.concrete_m3 * 1.5

    def test_concrete_scales_with_floors(self):
        low = _estimate(building=BuildingInput(builtup_area_sqft=2000, floors=1))
        high = _estimate(building=BuildingInput(builtup_area_sqft=2000, floors=3))
        assert high.concrete_m3 > low.concrete_m3

    def test_basement_adds_concrete(self):
        no_base = _estimate()
        with_base = _estimate(
            foundation=FoundationInput(include_basement=True, basement_area_sqft=1400)
        )
        assert with_base.concrete_m3 > no_base.concrete_m3


class TestSteelEstimation:
    def test_steel_positive(self):
        q = _estimate()
        assert q.steel_kg > 0

    def test_steel_proportional_to_concrete(self):
        q = _estimate()
        ratio = q.steel_kg / q.concrete_m3
        assert 60 <= ratio <= 110  # 65–100 kg/m³ expected range


class TestBrickEstimation:
    def test_brick_count_positive(self):
        q = _estimate()
        assert q.brick_count > 0

    def test_aac_uses_fewer_units(self):
        red = _estimate(materials=MaterialsInput(brick_type=BrickType.RED_BRICK))
        aac = _estimate(materials=MaterialsInput(brick_type=BrickType.AAC_BLOCK))
        assert aac.brick_count < red.brick_count  # AAC blocks are larger


class TestElectricalPlumbing:
    def test_electrical_scales_with_rooms(self):
        small = _estimate(rooms=RoomsInput(bedrooms=2, bathrooms=1))
        large = _estimate(rooms=RoomsInput(bedrooms=5, bathrooms=4, home_office=1, theatre=1))
        assert large.electrical_points > small.electrical_points

    def test_plumbing_scales_with_bathrooms(self):
        few = _estimate(rooms=RoomsInput(bathrooms=1))
        many = _estimate(rooms=RoomsInput(bathrooms=4))
        assert many.plumbing_fixtures > few.plumbing_fixtures


class TestBoundaryAndLandscape:
    def test_boundary_wall_when_enabled(self):
        q = _estimate(exterior=ExteriorInput(boundary_wall=True))
        assert q.boundary_wall_length_ft > 0

    def test_no_boundary_wall_when_disabled(self):
        q = _estimate(exterior=ExteriorInput(boundary_wall=False))
        assert q.boundary_wall_length_ft == 0

    def test_landscape_when_enabled(self):
        q = _estimate(exterior=ExteriorInput(landscape=True))
        assert q.landscape_area_sqft > 0

    def test_no_landscape_when_disabled(self):
        q = _estimate(exterior=ExteriorInput(landscape=False))
        assert q.landscape_area_sqft == 0
