"""
Service 12 — Quote Comparison Engine
Compares multiple builder quotes for the same project.
Calculates value scores, deviation from market rate, and flags outliers.
"""

from app.services.builder_intelligence import MarketIntelligence


class QuoteAnalysis:
    """Analysis of a single builder quote relative to market."""

    def __init__(self, builder_id: str, quoted_cost: float, builtup_area: float, floors: int):
        self.builder_id = builder_id
        self.quoted_cost = quoted_cost
        self.rate_per_sqft = quoted_cost / (builtup_area * floors) if builtup_area * floors > 0 else 0
        self.value_score: int = 0
        self.deviation_from_market: float = 0
        self.flag: str = "normal"  # normal, bargain, premium, suspicious
        self.notes: list[str] = []

    def to_dict(self) -> dict:
        return {
            "builder_id": self.builder_id,
            "quoted_cost": self.quoted_cost,
            "rate_per_sqft": round(self.rate_per_sqft, 2),
            "value_score": self.value_score,
            "deviation_from_market": f"{self.deviation_from_market:+.1f}%",
            "flag": self.flag,
            "notes": self.notes,
        }


def compare_quotes(
    quotes: list[dict],  # [{"builder_id": "...", "quoted_cost": 1234567, "builtup_area": 2000, "floors": 2}]
    market_intel: MarketIntelligence | None = None,
) -> list[QuoteAnalysis]:
    """
    Service 12 entry point.
    Compares multiple quotes and assigns value scores.
    """
    if not quotes:
        return []

    analyses = []
    for q in quotes:
        analysis = QuoteAnalysis(
            builder_id=q["builder_id"],
            quoted_cost=q["quoted_cost"],
            builtup_area=q.get("builtup_area", 2000),
            floors=q.get("floors", 2),
        )
        analyses.append(analysis)

    # ─── Calculate relative scores ───
    rates = [a.rate_per_sqft for a in analyses if a.rate_per_sqft > 0]
    if not rates:
        return analyses

    avg_rate = sum(rates) / len(rates)
    min_rate = min(rates)
    max_rate = max(rates)

    for analysis in analyses:
        if analysis.rate_per_sqft <= 0:
            continue

        # Deviation from average
        if avg_rate > 0:
            analysis.deviation_from_market = ((analysis.rate_per_sqft - avg_rate) / avg_rate) * 100

        # Market deviation (if market intelligence available)
        if market_intel and market_intel.weighted_average > 0:
            market_dev = ((analysis.rate_per_sqft - market_intel.weighted_average) / market_intel.weighted_average) * 100
            analysis.deviation_from_market = market_dev

        # ─── Flag assignment ───
        if analysis.deviation_from_market < -25:
            analysis.flag = "suspicious"
            analysis.notes.append("Quote is significantly below market rate — verify scope and quality.")
            analysis.value_score = 40
        elif analysis.deviation_from_market < -10:
            analysis.flag = "bargain"
            analysis.notes.append("Competitive pricing — good value if builder has strong track record.")
            analysis.value_score = 85
        elif analysis.deviation_from_market <= 10:
            analysis.flag = "normal"
            analysis.notes.append("Rate is within market range — fair pricing.")
            analysis.value_score = 75
        elif analysis.deviation_from_market <= 25:
            analysis.flag = "premium"
            analysis.notes.append("Above market rate — may include premium materials or services.")
            analysis.value_score = 60
        else:
            analysis.flag = "premium"
            analysis.notes.append("Significantly above market — review scope justification.")
            analysis.value_score = 35

    # Sort by value score descending
    analyses.sort(key=lambda a: a.value_score, reverse=True)
    return analyses
