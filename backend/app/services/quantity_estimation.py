"""
Service 6 — Quantity Estimation Engine
Estimates physical quantities BEFORE pricing.
This is NOT sqft-rate. We compute concrete volume, steel weight,
brick count, etc. — then price each independently.
"""

from app.services.user_input import NormalizedInput
from app.schemas.inputs import StructuralSystem, BrickType
import math


class QuantityTakeoff:
    """Complete physical quantity estimate for a project."""

    def __init__(self):
        self.concrete_m3: float = 0
        self.steel_kg: float = 0
        self.brick_count: int = 0
        self.plaster_area_sqft: float = 0
        self.flooring_area_sqft: float = 0
        self.paint_area_sqft: float = 0
        self.tile_area_sqft: float = 0
        self.electrical_points: int = 0
        self.plumbing_fixtures: int = 0
        self.window_area_sqft: float = 0
        self.door_count: int = 0
        self.boundary_wall_length_ft: float = 0
        self.boundary_wall_area_sqft: float = 0
        self.landscape_area_sqft: float = 0

    def to_dict(self) -> dict:
        return {
            "concrete_m3": round(self.concrete_m3, 2),
            "steel_kg": round(self.steel_kg, 1),
            "brick_count": self.brick_count,
            "plaster_area_sqft": round(self.plaster_area_sqft, 1),
            "flooring_area_sqft": round(self.flooring_area_sqft, 1),
            "paint_area_sqft": round(self.paint_area_sqft, 1),
            "tile_area_sqft": round(self.tile_area_sqft, 1),
            "electrical_points": self.electrical_points,
            "plumbing_fixtures": self.plumbing_fixtures,
            "window_area_sqft": round(self.window_area_sqft, 1),
            "door_count": self.door_count,
            "boundary_wall_length_ft": round(self.boundary_wall_length_ft, 1),
            "landscape_area_sqft": round(self.landscape_area_sqft, 1),
        }


# ─── Steel ratio (kg of steel per m³ of concrete) ───
STEEL_RATIOS: dict[str, float] = {
    "economy": 65,
    "standard": 75,
    "premium": 85,
    "luxury": 95,
    "ultra_luxury": 100,
}

# ─── Concrete usage (m³ per sqft of built-up area) ───
CONCRETE_FACTORS: dict[StructuralSystem, float] = {
    StructuralSystem.LOAD_BEARING: 0.030,
    StructuralSystem.RCC_FRAME: 0.038,
    StructuralSystem.STEEL_FRAME: 0.025,
    StructuralSystem.COMPOSITE: 0.035,
}

# ─── Window area as % of built-up area ───
WINDOW_RATIO: dict[str, float] = {
    "economy": 0.10,
    "standard": 0.12,
    "premium": 0.15,
    "luxury": 0.18,
    "ultra_luxury": 0.22,
}

# ─── Brick coverage (sqft of wall per brick) ───
BRICK_COVERAGE: dict[BrickType, float] = {
    BrickType.RED_BRICK: 0.5,     # ~2 bricks per sqft of 9" wall
    BrickType.AAC_BLOCK: 1.5,     # Larger blocks
    BrickType.FLY_ASH: 0.55,
    BrickType.HOLLOW_BLOCK: 1.2,
}


def estimate_quantities(inp: NormalizedInput) -> QuantityTakeoff:
    """
    Service 6 entry point.
    Estimates all physical quantities from normalized project inputs.
    """
    q = QuantityTakeoff()
    quality = inp.quality.value.lower()
    total_builtup = inp.total_builtup

    # ─── Wall area estimation ───
    # Perimeter of floor × ceiling height × floors
    # Approximate floor perimeter from builtup area (assume ~3:2 rectangle)
    floor_perimeter = 2 * (math.sqrt(inp.builtup_area * 1.5) + math.sqrt(inp.builtup_area / 1.5))
    # Internal walls: ~0.6× the external wall length
    internal_wall_length = floor_perimeter * 0.6 * inp.total_rooms / 5  # Scale by room count
    total_wall_length = (floor_perimeter + internal_wall_length) * inp.floors
    wall_area = total_wall_length * inp.ceiling_height

    # ─── 1. Concrete ───
    concrete_factor = CONCRETE_FACTORS.get(inp.structural_system, 0.038)
    q.concrete_m3 = total_builtup * concrete_factor
    # Add basement concrete if applicable
    if inp.include_basement:
        q.concrete_m3 += inp.basement_area * 0.045  # Basements use more concrete

    # ─── 2. Steel ───
    steel_ratio = STEEL_RATIOS.get(quality, 75)
    q.steel_kg = q.concrete_m3 * steel_ratio

    # ─── 3. Bricks ───
    brick_coverage = BRICK_COVERAGE.get(inp.brick_type, 0.5)
    # Subtract window + door openings (~15% of wall area)
    net_wall_area = wall_area * 0.85
    q.brick_count = int(net_wall_area / brick_coverage)

    # ─── 4. Plaster ───
    q.plaster_area_sqft = wall_area * 2  # Both sides

    # ─── 5. Flooring ───
    q.flooring_area_sqft = total_builtup
    if inp.include_basement:
        q.flooring_area_sqft += inp.basement_area

    # ─── 6. Paint ───
    ceiling_area = total_builtup  # Ceilings
    q.paint_area_sqft = q.plaster_area_sqft + ceiling_area

    # ─── 7. Tiles (bathrooms + kitchen) ───
    avg_bathroom_area = 50  # sqft per bathroom
    avg_kitchen_area = 80   # sqft
    bathroom_tile = inp.bathrooms * avg_bathroom_area * 3  # Floor + walls (3× area)
    kitchen_tile = inp.kitchen * avg_kitchen_area * 1.5      # Floor + partial walls
    q.tile_area_sqft = bathroom_tile + kitchen_tile

    # ─── 8. Electrical points ───
    q.electrical_points = (
        inp.bedrooms * 8 +
        inp.bathrooms * 4 +
        inp.kitchen * 6 +
        inp.living_rooms * 10 +
        inp.home_office * 8 +
        inp.theatre * 15 +
        inp.parking * 3 +
        inp.floors * 4  # Common areas per floor (staircase, corridor)
    )

    # ─── 9. Plumbing fixtures ───
    q.plumbing_fixtures = (
        inp.bathrooms * 5 +  # WC, basin, shower, mixer, drain
        inp.kitchen * 3 +     # Sink, mixer, drain
        (1 if inp.pool else 0) * 8  # Pool plumbing
    )

    # ─── 10. Windows ───
    window_ratio = WINDOW_RATIO.get(quality, 0.12)
    q.window_area_sqft = total_builtup * window_ratio

    # ─── 11. Doors ───
    q.door_count = (
        inp.bedrooms +
        inp.bathrooms +
        inp.kitchen +
        inp.living_rooms +
        inp.home_office +
        inp.theatre +
        inp.floors * 2  # Main door + staircase door per floor
    )

    # ─── 12. Boundary wall ───
    if inp.boundary_wall:
        q.boundary_wall_length_ft = inp.plot_perimeter
        q.boundary_wall_area_sqft = q.boundary_wall_length_ft * inp.boundary_wall_height

    # ─── 13. Landscape ───
    if inp.landscape:
        q.landscape_area_sqft = max(0, inp.plot_area - inp.footprint_area)

    return q
