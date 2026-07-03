"""
Seed data for sample builder rates.
"""

from app.models.builder import BuilderRate


BUILDER_RATES = [
    # builder_id, city_id, construction_type, quality_tier, rate_per_sqft
    ("builder-1", 1, "residential", "standard", 2200),
    ("builder-1", 1, "residential", "premium", 3100),
    ("builder-1", 1, "residential", "luxury", 4500),
    ("builder-2", 1, "residential", "standard", 2050),
    ("builder-2", 1, "residential", "premium", 2900),
    ("builder-2", 1, "residential", "luxury", 4200),
    ("builder-3", 1, "residential", "economy", 1500),
    ("builder-3", 1, "residential", "standard", 1950),
    ("builder-3", 1, "residential", "premium", 2700),
]


async def seed_builders() -> int:
    """Insert sample builder rates. Returns count."""
    count = 0
    for builder_id, city_id, construction_type, quality_tier, rate in BUILDER_RATES:
        existing = await BuilderRate.filter(
            builder_id=builder_id,
            city_id=city_id,
            quality_tier=quality_tier,
        ).first()
        if not existing:
            await BuilderRate.create(
                builder_id=builder_id,
                city_id=city_id,
                construction_type=construction_type,
                quality_tier=quality_tier,
                rate_per_sqft=rate,
            )
            count += 1

    return count
