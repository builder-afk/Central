"""
Seed data for labour rates.
Base daily rates (national average) by trade.
"""

from app.models.labour import LabourRate, Trade


# (trade, daily_rate)
LABOUR_RATES = [
    (Trade.MASON, 800),
    (Trade.CARPENTER, 750),
    (Trade.ELECTRICIAN, 700),
    (Trade.PLUMBER, 700),
    (Trade.PAINTER, 650),
    (Trade.HELPER, 450),
    (Trade.CIVIL_CONTRACTOR, 1200),
    (Trade.INTERIOR_CONTRACTOR, 1500),
]


async def seed_labour(city_id: int = 1) -> int:
    """Insert labour rates for a given city. Returns count."""
    count = 0
    for trade, daily_rate in LABOUR_RATES:
        existing = await LabourRate.filter(
            city_id=city_id,
            trade=trade,
        ).first()
        if not existing:
            await LabourRate.create(
                city_id=city_id,
                trade=trade,
                daily_rate=daily_rate,
            )
            count += 1

    return count
