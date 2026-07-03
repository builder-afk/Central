"""
Service 8 — Builder Pricing Intelligence
Statistical analysis of builder quotes and completed projects.
Continuously calculates market rates, detects outliers,
and weights accepted vs rejected quotes.
"""

from app.models.quote import BuilderQuote
from app.models.project import ProjectHistory


class MarketIntelligence:
    """Statistical summary of market rates."""

    def __init__(self):
        self.average: float = 0
        self.median: float = 0
        self.lowest: float = 0
        self.highest: float = 0
        self.weighted_average: float = 0
        self.sample_size: int = 0
        self.trend: str = "stable"

    def to_dict(self) -> dict:
        return {
            "average": round(self.average, 2),
            "median": round(self.median, 2),
            "lowest": round(self.lowest, 2),
            "highest": round(self.highest, 2),
            "weighted_average": round(self.weighted_average, 2),
            "sample_size": self.sample_size,
            "trend": self.trend,
        }


def _calculate_statistics(values: list[float], weights: list[float] | None = None) -> dict:
    """Calculate statistical measures from a list of values."""
    if not values:
        return {"average": 0, "median": 0, "lowest": 0, "highest": 0, "weighted_average": 0}

    sorted_values = sorted(values)
    n = len(sorted_values)

    average = sum(values) / n
    median = sorted_values[n // 2] if n % 2 else (sorted_values[n // 2 - 1] + sorted_values[n // 2]) / 2
    lowest = sorted_values[0]
    highest = sorted_values[-1]

    # Weighted average (accepted quotes weighted higher)
    if weights and len(weights) == len(values):
        total_weight = sum(weights)
        weighted_average = sum(v * w for v, w in zip(values, weights)) / total_weight if total_weight > 0 else average
    else:
        weighted_average = average

    return {
        "average": average,
        "median": median,
        "lowest": lowest,
        "highest": highest,
        "weighted_average": weighted_average,
    }


def _detect_outliers(values: list[float]) -> list[float]:
    """Detect outliers using IQR method. Returns list of non-outlier values."""
    if len(values) < 4:
        return values

    sorted_vals = sorted(values)
    n = len(sorted_vals)
    q1 = sorted_vals[n // 4]
    q3 = sorted_vals[3 * n // 4]
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr

    return [v for v in values if lower_bound <= v <= upper_bound]


async def get_market_rates(
    city_name: str,
    quality_tier: str,
    project_type: str = "residential",
) -> MarketIntelligence:
    """
    Service 8 entry point.
    Calculates market rate statistics from builder quotes.
    """
    intel = MarketIntelligence()

    # ─── Fetch quotes ───
    try:
        quotes = await BuilderQuote.filter(
            quality_tier=quality_tier,
        ).all()
    except Exception:
        quotes = []

    if not quotes:
        return intel

    # ─── Compute rate per sqft for each quote ───
    rates = []
    weights = []

    for q in quotes:
        if q.builtup_area > 0:
            rate = q.quoted_cost / (q.builtup_area * q.floors)
            rates.append(rate)
            # Accepted quotes get 1.0 weight, rejected get 0.1
            weights.append(1.0 if q.accepted else 0.1)

    if not rates:
        return intel

    # ─── Remove outliers ───
    clean_rates = _detect_outliers(rates)

    # ─── Calculate statistics ───
    stats = _calculate_statistics(clean_rates, weights[:len(clean_rates)])

    intel.average = stats["average"]
    intel.median = stats["median"]
    intel.lowest = stats["lowest"]
    intel.highest = stats["highest"]
    intel.weighted_average = stats["weighted_average"]
    intel.sample_size = len(clean_rates)

    return intel


async def get_builder_accuracy(builder_id: str) -> dict:
    """
    Calculate a builder's estimation accuracy from completed projects.
    """
    try:
        projects = await ProjectHistory.filter(
            builder_id=builder_id,
            final_cost__isnull=False,
        ).all()
    except Exception:
        projects = []

    if not projects:
        return {"accuracy": None, "projects": 0}

    variances = [abs(p.variance_percent or 0) for p in projects]
    avg_variance = sum(variances) / len(variances) if variances else 0

    return {
        "accuracy": round(100 - avg_variance, 1),
        "avg_variance": round(avg_variance, 1),
        "projects": len(projects),
    }
