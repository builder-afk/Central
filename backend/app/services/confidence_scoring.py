"""
Service 10 — Confidence Scoring Engine
Calculates estimate confidence based on input completeness,
available historical data, and builder quote coverage.
"""

from app.services.user_input import NormalizedInput
from app.schemas.inputs import SoilType, AutomationLevel


class ConfidenceResult:
    """Confidence score with explanations."""

    def __init__(self):
        self.base_score: float = 60.0  # Start at 60%
        self.factors: list[dict] = []

    def add_factor(self, factor: str, impact: float, description: str):
        self.factors.append({
            "factor": factor,
            "impact": f"{'+' if impact >= 0 else ''}{impact}%",
            "impact_value": impact,
            "description": description,
        })
        self.base_score += impact

    @property
    def percentage(self) -> int:
        return max(10, min(98, int(self.base_score)))

    @property
    def level(self) -> str:
        if self.percentage >= 80:
            return "High"
        elif self.percentage >= 55:
            return "Medium"
        else:
            return "Low"

    def to_dict(self) -> dict:
        return {
            "percentage": self.percentage,
            "level": self.level,
            "factors": self.factors,
        }


def calculate_confidence(
    inp: NormalizedInput,
    has_builder_quotes: bool = False,
    regional_project_count: int = 0,
    similar_project_count: int = 0,
) -> ConfidenceResult:
    """
    Service 10 entry point.
    Evaluates confidence based on input completeness and data availability.
    """
    result = ConfidenceResult()

    # ─── Negative factors (incomplete information) ───

    if inp.soil_type == SoilType.NORMAL:
        # "Normal" is often a placeholder — user may not know actual soil
        result.add_factor(
            "Unknown Soil Type",
            -8,
            "Soil type not specified. Foundation costs may vary significantly based on actual soil conditions.",
        )

    if not inp.steel_brand and not inp.cement_brand:
        result.add_factor(
            "Unknown Materials",
            -5,
            "No specific material brands selected. Costs are based on average market rates.",
        )

    if not inp.include_interior:
        result.add_factor(
            "No Interior Selection",
            -6,
            "Interior finishing not included. Final habitable cost will be higher.",
        )

    if inp.foundation_type == inp.foundation_type.__class__("isolated"):
        # Default foundation — user may not have consulted a structural engineer
        result.add_factor(
            "Default Foundation Type",
            -4,
            "Foundation type is set to default. Actual foundation requirement depends on soil report.",
        )

    if inp.builtup_area < 800:
        result.add_factor(
            "Very Small Project",
            -3,
            "Very small projects have higher per-sqft costs due to fixed overheads.",
        )

    if inp.floors >= 4:
        result.add_factor(
            "Multi-storey Complexity",
            -4,
            "4+ floors require structural engineering review. Costs may vary with actual structural design.",
        )

    # ─── Positive factors (more data = more confidence) ───

    if has_builder_quotes:
        result.add_factor(
            "Builder Quote History",
            +10,
            "Builder quotes available for similar projects in this area, improving estimate accuracy.",
        )

    if regional_project_count >= 5:
        boost = min(12, regional_project_count)
        result.add_factor(
            "Regional Historical Data",
            +boost,
            f"{regional_project_count} completed projects in {inp.city} provide strong regional pricing data.",
        )

    if similar_project_count >= 3:
        boost = min(15, similar_project_count * 3)
        result.add_factor(
            "Similar Completed Projects",
            +boost,
            f"{similar_project_count} similar projects found, enabling direct cost comparison.",
        )

    # ─── Bonus for detailed inputs ───

    if inp.steel_brand or inp.cement_brand:
        result.add_factor(
            "Specific Material Selection",
            +3,
            "Specific material brands selected, enabling more precise pricing.",
        )

    if inp.plot_area and inp.plot_area != inp.builtup_area * 1.8:
        result.add_factor(
            "Actual Plot Dimensions",
            +4,
            "Actual plot dimensions provided instead of estimates.",
        )

    if inp.automation_level != AutomationLevel.NONE:
        result.add_factor(
            "Automation Specified",
            +2,
            "Home automation level specified, included in estimate.",
        )

    return result
