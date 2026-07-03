"""
Service 1 — User Input Service
Validates, normalizes, and enriches raw user inputs.
Fills intelligent defaults based on quality tier and city.
"""

from app.schemas.inputs import (
    ProjectInput, QualityTier, PlotInput, RoomsInput,
    MaterialsInput, BrickType, FlooringType, ExteriorInput,
)


# ─── Default room configurations by quality tier ───
ROOM_DEFAULTS: dict[QualityTier, dict] = {
    QualityTier.ECONOMY: {"bedrooms": 2, "bathrooms": 2, "kitchen": 1, "parking": 1, "living_rooms": 1},
    QualityTier.STANDARD: {"bedrooms": 3, "bathrooms": 2, "kitchen": 1, "parking": 1, "living_rooms": 1},
    QualityTier.PREMIUM: {"bedrooms": 3, "bathrooms": 3, "kitchen": 1, "parking": 2, "living_rooms": 2},
    QualityTier.LUXURY: {"bedrooms": 4, "bathrooms": 4, "kitchen": 2, "parking": 2, "living_rooms": 2, "home_office": 1},
    QualityTier.ULTRA_LUXURY: {"bedrooms": 5, "bathrooms": 5, "kitchen": 2, "parking": 3, "living_rooms": 3, "home_office": 1, "theatre": 1, "pool": 1},
}

# ─── Material defaults by quality ───
MATERIAL_DEFAULTS: dict[QualityTier, dict] = {
    QualityTier.ECONOMY: {"brick_type": BrickType.RED_BRICK, "flooring_type": FlooringType.CERAMIC},
    QualityTier.STANDARD: {"brick_type": BrickType.RED_BRICK, "flooring_type": FlooringType.VITRIFIED},
    QualityTier.PREMIUM: {"brick_type": BrickType.AAC_BLOCK, "flooring_type": FlooringType.GRANITE},
    QualityTier.LUXURY: {"brick_type": BrickType.AAC_BLOCK, "flooring_type": FlooringType.MARBLE},
    QualityTier.ULTRA_LUXURY: {"brick_type": BrickType.AAC_BLOCK, "flooring_type": FlooringType.ITALIAN_MARBLE},
}


class NormalizedInput:
    """Cleaned, validated, and enriched project input."""

    def __init__(self, raw: ProjectInput):
        self.city = raw.location.city
        self.state = raw.location.state
        self.pin_code = raw.location.pin_code
        self.quality = raw.quality_tier
        self.timeline = raw.timeline

        # ─── Building ───
        self.builtup_area = raw.building.builtup_area_sqft
        self.floors = raw.building.floors
        self.ceiling_height = raw.building.ceiling_height_ft
        self.structural_system = raw.building.structural_system

        # ─── Foundation ───
        self.soil_type = raw.foundation.soil_type
        self.foundation_type = raw.foundation.foundation_type
        self.include_basement = raw.foundation.include_basement
        self.basement_area = raw.foundation.basement_area_sqft or (
            self.builtup_area * 0.7 if raw.foundation.include_basement else 0
        )

        # ─── Plot (estimate if not provided) ───
        if raw.plot:
            self.plot_area = raw.plot.area_sqft or (self.builtup_area * 1.8)
            self.corner_plot = raw.plot.corner_plot
        else:
            self.plot_area = self.builtup_area * 1.8
            self.corner_plot = False

        # ─── Rooms (fill defaults by quality if not customized) ───
        room_defaults = ROOM_DEFAULTS.get(raw.quality_tier, ROOM_DEFAULTS[QualityTier.STANDARD])
        self.bedrooms = raw.rooms.bedrooms if raw.rooms.bedrooms != 3 else room_defaults.get("bedrooms", 3)
        self.bathrooms = raw.rooms.bathrooms if raw.rooms.bathrooms != 2 else room_defaults.get("bathrooms", 2)
        self.kitchen = raw.rooms.kitchen
        self.parking = raw.rooms.parking
        self.living_rooms = raw.rooms.living_rooms
        self.home_office = raw.rooms.home_office or room_defaults.get("home_office", 0)
        self.theatre = raw.rooms.theatre or room_defaults.get("theatre", 0)
        self.pool = raw.rooms.pool or room_defaults.get("pool", 0)

        # ─── Total room count ───
        self.total_rooms = (
            self.bedrooms + self.bathrooms + self.kitchen +
            self.living_rooms + self.home_office + self.theatre
        )

        # ─── Materials ───
        mat_defaults = MATERIAL_DEFAULTS.get(raw.quality_tier, MATERIAL_DEFAULTS[QualityTier.STANDARD])
        self.brick_type = raw.materials.brick_type or mat_defaults["brick_type"]
        self.flooring_type = raw.materials.flooring_type or mat_defaults["flooring_type"]
        self.steel_brand = raw.materials.steel_brand
        self.cement_brand = raw.materials.cement_brand
        self.door_type = raw.materials.door_type
        self.window_type = raw.materials.window_type

        # ─── Interiors ───
        self.include_interior = raw.interiors.include_interior
        self.automation_level = raw.interiors.automation_level

        # ─── Exterior ───
        self.boundary_wall = raw.exterior.boundary_wall
        self.boundary_wall_height = raw.exterior.boundary_wall_height_ft
        self.landscape = raw.exterior.landscape
        self.driveway = raw.exterior.driveway
        self.solar = raw.exterior.solar
        self.solar_capacity_kw = raw.exterior.solar_capacity_kw or (
            3.0 if raw.exterior.solar else 0
        )
        self.ev_charging = raw.exterior.ev_charging

        # ─── Computed helpers ───
        self.total_builtup = self.builtup_area * self.floors
        self.footprint_area = self.builtup_area
        self.plot_perimeter = 4 * (self.plot_area ** 0.5)  # Approximate square plot


def validate_and_normalize(raw_input: ProjectInput) -> NormalizedInput:
    """
    Service 1 entry point.
    Takes raw ProjectInput, returns a clean NormalizedInput.
    """
    return NormalizedInput(raw_input)
