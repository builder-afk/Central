"""
Service 4 — Labour Pricing Engine
Regional labour rates by trade, adjusted for timeline pressure and project size.
"""

from app.services.regional_pricing import RegionalIndices
from app.schemas.inputs import TimelineType


# ─── Base daily rates (₹/day, national average) ───
BASE_LABOUR_RATES: dict[str, float] = {
    "mason": 800,
    "carpenter": 750,
    "electrician": 700,
    "plumber": 700,
    "painter": 650,
    "helper": 450,
    "civil_contractor": 1200,
    "interior_contractor": 1500,
}

# ─── Timeline multipliers ───
TIMELINE_MULTIPLIERS: dict[TimelineType, float] = {
    TimelineType.NORMAL: 1.0,
    TimelineType.FAST_TRACK: 1.15,
    TimelineType.URGENT: 1.30,
}

# ─── Project size multipliers (larger projects get slight premium) ───
def _size_multiplier(builtup_area: float) -> float:
    if builtup_area <= 1000:
        return 1.0
    elif builtup_area <= 2500:
        return 1.0
    elif builtup_area <= 5000:
        return 1.05
    elif builtup_area <= 8000:
        return 1.08
    else:
        return 1.12


class LabourRates:
    """Container for all labour rates for a specific context."""

    def __init__(self, rates: dict[str, dict]):
        self._rates = rates

    def get_rate(self, trade: str) -> float:
        """Get daily rate for a specific trade."""
        return self._rates.get(trade, {}).get("rate", 0)

    def to_dict(self) -> dict:
        return self._rates

    @property
    def total_daily_cost(self) -> float:
        """Sum of all trade daily rates (for a full team)."""
        return sum(r["rate"] for r in self._rates.values())


def get_labour_rates(
    indices: RegionalIndices,
    timeline: TimelineType = TimelineType.NORMAL,
    builtup_area: float = 2000,
) -> LabourRates:
    """
    Service 4 entry point.
    Returns labour rates adjusted for city, timeline, and project size.
    """
    timeline_mult = TIMELINE_MULTIPLIERS.get(timeline, 1.0)
    size_mult = _size_multiplier(builtup_area)

    rates: dict[str, dict] = {}

    for trade, base_rate in BASE_LABOUR_RATES.items():
        adjusted = round(
            base_rate * indices.labour_index * timeline_mult * size_mult
        )
        rates[trade] = {
            "rate": adjusted,
            "base_rate": base_rate,
            "regional_adjustment": round(indices.labour_index, 4),
            "timeline_adjustment": timeline_mult,
            "size_adjustment": size_mult,
        }

    return LabourRates(rates)


def estimate_labour_days(builtup_area: float, floors: int, quality_tier: str) -> dict[str, int]:
    """
    Estimate total man-days required by trade.
    This converts area → labour duration for costing.
    """
    total_area = builtup_area * floors

    # Base man-days per 1000 sqft
    base_days_per_1000: dict[str, dict[str, float]] = {
        "mason": {"economy": 45, "standard": 55, "premium": 65, "luxury": 80, "ultra_luxury": 100},
        "carpenter": {"economy": 15, "standard": 20, "premium": 30, "luxury": 45, "ultra_luxury": 65},
        "electrician": {"economy": 10, "standard": 14, "premium": 20, "luxury": 28, "ultra_luxury": 40},
        "plumber": {"economy": 8, "standard": 12, "premium": 16, "luxury": 22, "ultra_luxury": 32},
        "painter": {"economy": 12, "standard": 16, "premium": 22, "luxury": 30, "ultra_luxury": 42},
        "helper": {"economy": 60, "standard": 75, "premium": 90, "luxury": 110, "ultra_luxury": 140},
    }

    tier = quality_tier.lower().replace(" ", "_")
    factor = total_area / 1000

    result = {}
    for trade, tier_days in base_days_per_1000.items():
        days = tier_days.get(tier, tier_days["standard"])
        result[trade] = round(days * factor)

    return result


def calculate_total_labour_cost(
    indices: RegionalIndices,
    builtup_area: float,
    floors: int,
    quality_tier: str,
    timeline: TimelineType = TimelineType.NORMAL,
) -> dict:
    """
    Calculate total labour cost.
    labour_cost = Σ (man-days × daily_rate) for each trade
    """
    rates = get_labour_rates(indices, timeline, builtup_area)
    man_days = estimate_labour_days(builtup_area, floors, quality_tier)

    trade_costs = {}
    total = 0

    for trade, days in man_days.items():
        daily_rate = rates.get_rate(trade)
        cost = days * daily_rate
        trade_costs[trade] = {
            "days": days,
            "daily_rate": daily_rate,
            "total": cost,
        }
        total += cost

    return {
        "trades": trade_costs,
        "total_labour_cost": total,
        "total_man_days": sum(man_days.values()),
    }
