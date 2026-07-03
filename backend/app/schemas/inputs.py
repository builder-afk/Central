"""
Structured project input schema.
Captures every possible detail about a construction project.
Only city, builtup_area, floors, and quality_tier are required.
Everything else has intelligent defaults.
"""

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


# ─── Enums ───

class QualityTier(str, Enum):
    ECONOMY = "economy"
    STANDARD = "standard"
    PREMIUM = "premium"
    LUXURY = "luxury"
    ULTRA_LUXURY = "ultra_luxury"


class SoilType(str, Enum):
    NORMAL = "normal"
    HARD_ROCK = "hard_rock"
    SOFT_SOIL = "soft_soil"
    BLACK_COTTON = "black_cotton"
    SANDY = "sandy"
    CLAY = "clay"


class FoundationType(str, Enum):
    STRIP = "strip"
    ISOLATED = "isolated"
    RAFT = "raft"
    PILE = "pile"


class StructuralSystem(str, Enum):
    LOAD_BEARING = "load_bearing"
    RCC_FRAME = "rcc_frame"
    STEEL_FRAME = "steel_frame"
    COMPOSITE = "composite"


class BrickType(str, Enum):
    RED_BRICK = "red_brick"
    AAC_BLOCK = "aac_block"
    FLY_ASH = "fly_ash"
    HOLLOW_BLOCK = "hollow_block"


class FlooringType(str, Enum):
    CERAMIC = "ceramic"
    VITRIFIED = "vitrified"
    MARBLE = "marble"
    GRANITE = "granite"
    WOODEN = "wooden"
    ITALIAN_MARBLE = "italian_marble"


class TimelineType(str, Enum):
    NORMAL = "normal"          # 12–18 months
    FAST_TRACK = "fast_track"  # 8–12 months (1.15× labour)
    URGENT = "urgent"          # 6–8 months (1.30× labour)


class AutomationLevel(str, Enum):
    NONE = "none"
    BASIC = "basic"        # Smart switches, basic wiring
    ADVANCED = "advanced"  # Full home automation


# ─── Sub-models ───

class LocationInput(BaseModel):
    state: Optional[str] = None
    city: str
    pin_code: Optional[str] = None


class PlotInput(BaseModel):
    area_sqft: Optional[float] = None
    width_ft: Optional[float] = None
    length_ft: Optional[float] = None
    slope: Optional[str] = Field(None, description="flat, gentle, steep")
    corner_plot: bool = False
    access_road_width_ft: Optional[float] = None


class FoundationInput(BaseModel):
    soil_type: SoilType = SoilType.NORMAL
    foundation_type: FoundationType = FoundationType.ISOLATED
    include_basement: bool = False
    basement_area_sqft: Optional[float] = None


class BuildingInput(BaseModel):
    builtup_area_sqft: float = Field(..., gt=0, description="Per-floor built-up area")
    floors: int = Field(..., ge=1, le=10)
    ceiling_height_ft: float = Field(default=10.0, ge=8.0, le=20.0)
    structural_system: StructuralSystem = StructuralSystem.RCC_FRAME


class RoomsInput(BaseModel):
    bedrooms: int = Field(default=3, ge=1, le=12)
    bathrooms: int = Field(default=2, ge=1, le=10)
    kitchen: int = Field(default=1, ge=1, le=3)
    parking: int = Field(default=1, ge=0, le=5)
    living_rooms: int = Field(default=1, ge=1, le=4)
    home_office: int = Field(default=0, ge=0, le=3)
    theatre: int = Field(default=0, ge=0, le=1)
    pool: int = Field(default=0, ge=0, le=1)


class MaterialsInput(BaseModel):
    steel_brand: Optional[str] = None
    cement_brand: Optional[str] = None
    brick_type: BrickType = BrickType.RED_BRICK
    flooring_type: FlooringType = FlooringType.VITRIFIED
    paint_type: Optional[str] = None
    door_type: Optional[str] = Field(None, description="flush, panel, solid_wood, designer")
    window_type: Optional[str] = Field(None, description="aluminium, upvc, wooden, glass")


class InteriorsInput(BaseModel):
    include_interior: bool = False
    automation_level: AutomationLevel = AutomationLevel.NONE


class ExteriorInput(BaseModel):
    boundary_wall: bool = True
    boundary_wall_height_ft: float = Field(default=6.0, ge=3.0, le=12.0)
    landscape: bool = False
    driveway: bool = True
    solar: bool = False
    solar_capacity_kw: Optional[float] = None
    ev_charging: bool = False


# ─── Main Input Model ───

class ProjectInput(BaseModel):
    """
    Complete project input for the cost intelligence engine.
    Only location.city, building.builtup_area_sqft, building.floors,
    and quality_tier are required. Everything else has defaults.
    """

    location: LocationInput
    plot: Optional[PlotInput] = None
    foundation: FoundationInput = FoundationInput()
    building: BuildingInput
    rooms: RoomsInput = RoomsInput()
    quality_tier: QualityTier = QualityTier.STANDARD
    materials: MaterialsInput = MaterialsInput()
    interiors: InteriorsInput = InteriorsInput()
    exterior: ExteriorInput = ExteriorInput()
    timeline: TimelineType = TimelineType.NORMAL

    model_config = {"json_schema_extra": {
        "examples": [{
            "location": {"city": "Gurgaon"},
            "building": {"builtup_area_sqft": 2000, "floors": 2},
            "quality_tier": "standard",
        }]
    }}
