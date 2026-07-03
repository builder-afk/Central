"""
Seed data for material rates.
Base rates (national average) by quality tier.
"""

from app.models.material import MaterialRate, MaterialType, QualityTier


# (material_type, unit, economy, standard, premium, luxury, ultra_luxury)
MATERIALS = [
    (MaterialType.CEMENT, "bag", 350, 380, 420, 450, 500),
    (MaterialType.STEEL, "kg", 58, 65, 72, 82, 95),
    (MaterialType.SAND, "cft", 45, 55, 65, 75, 85),
    (MaterialType.AGGREGATE, "cft", 32, 38, 45, 52, 60),
    (MaterialType.BRICK, "piece", 7, 9, 11, 13, 15),
    (MaterialType.AAC_BLOCK, "piece", 35, 45, 55, 65, 75),
    (MaterialType.PAINT, "sqft", 14, 22, 35, 55, 80),
    (MaterialType.TILES, "sqft", 35, 65, 120, 250, 500),
    (MaterialType.MARBLE, "sqft", 80, 120, 200, 400, 800),
    (MaterialType.GRANITE, "sqft", 60, 90, 150, 280, 500),
    (MaterialType.WOOD, "cft", 1200, 1800, 2800, 4500, 8000),
    (MaterialType.GLASS, "sqft", 45, 75, 140, 250, 450),
    (MaterialType.ELECTRICAL, "point", 800, 1200, 1800, 2800, 4500),
    (MaterialType.PLUMBING, "point", 2500, 4000, 6500, 10000, 18000),
]

QUALITY_TIERS = [
    (QualityTier.ECONOMY, 0),
    (QualityTier.STANDARD, 1),
    (QualityTier.PREMIUM, 2),
    (QualityTier.LUXURY, 3),
    (QualityTier.ULTRA_LUXURY, 4),
]


async def seed_materials(city_id: int = 1) -> int:
    """Insert material rates for a given city. Returns count."""
    count = 0
    for mat_type, unit, *rates in MATERIALS:
        for tier, idx in QUALITY_TIERS:
            rate_value = rates[idx] if idx < len(rates) else rates[-1]
            existing = await MaterialRate.filter(
                city_id=city_id,
                material_type=mat_type,
                quality_tier=tier,
            ).first()
            if not existing:
                await MaterialRate.create(
                    city_id=city_id,
                    material_type=mat_type,
                    quality_tier=tier,
                    current_rate=rate_value,
                    unit=unit,
                )
                count += 1

    return count
