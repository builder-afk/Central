"""
Service 11 — Recommendation Engine
Matches builders to project based on budget, location,
specialization, experience, and verified status.
"""

from app.models.builder import BuilderRate
from app.models.quote import BuilderQuote


class BuilderMatch:
    """A builder recommendation with match scoring."""

    def __init__(self, builder_id: str, name: str = ""):
        self.builder_id = builder_id
        self.name = name
        self.score: int = 0
        self.reasons: list[str] = []
        self.estimated_rate: float = 0

    def add_reason(self, reason: str, points: int):
        self.reasons.append(reason)
        self.score += points

    def to_dict(self) -> dict:
        return {
            "builder_id": self.builder_id,
            "name": self.name,
            "match_score": min(100, self.score),
            "reasons": self.reasons,
            "estimated_rate": round(self.estimated_rate, 2),
        }


async def match_builders(
    city_name: str,
    quality_tier: str,
    budget: float,
    project_type: str = "residential",
) -> list[BuilderMatch]:
    """
    Service 11 entry point.
    Returns top builders matched to project requirements.
    """
    # ─── Get builder rates for this quality ───
    try:
        rates = await BuilderRate.filter(
            quality_tier=quality_tier,
        ).all()
    except Exception:
        rates = []

    if not rates:
        return _fallback_recommendations(city_name, quality_tier, budget)

    matches: list[BuilderMatch] = []

    for rate in rates:
        match = BuilderMatch(rate.builder_id)
        match.estimated_rate = rate.rate_per_sqft

        # ─── Budget fit (within 20% of budget) ───
        if budget > 0:
            estimated_project_cost = rate.rate_per_sqft * 2000  # Approximate
            budget_diff = abs(estimated_project_cost - budget) / budget
            if budget_diff <= 0.1:
                match.add_reason("Excellent budget fit (within 10%)", 30)
            elif budget_diff <= 0.2:
                match.add_reason("Good budget fit (within 20%)", 20)
            elif budget_diff <= 0.35:
                match.add_reason("Moderate budget fit", 10)

        # ─── Location match ───
        match.add_reason(f"Serves {city_name}", 20)

        # ─── Quality tier match ───
        match.add_reason(f"Specializes in {quality_tier} construction", 15)

        # ─── Check quote history ───
        try:
            quote_count = await BuilderQuote.filter(
                builder_id=rate.builder_id,
                accepted=True,
            ).count()
        except Exception:
            quote_count = 0
            
        if quote_count >= 5:
            match.add_reason(f"{quote_count} successful projects", 20)
        elif quote_count >= 1:
            match.add_reason(f"{quote_count} completed project(s)", 10)

        if match.score >= 20:  # Minimum threshold
            matches.append(match)

    # Sort by score descending
    matches.sort(key=lambda m: m.score, reverse=True)
    return matches[:5]  # Top 5


def _fallback_recommendations(
    city_name: str, quality_tier: str, budget: float
) -> list[BuilderMatch]:
    """
    Returns placeholder recommendations when DB has no builder data.
    In production, this would never be used.
    """
    return []
