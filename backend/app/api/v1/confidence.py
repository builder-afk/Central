"""
GET /confidence — Confidence score explanation
"""

from fastapi import APIRouter
from app.schemas.inputs import ProjectInput
from app.services.user_input import validate_and_normalize
from app.services.confidence_scoring import calculate_confidence

router = APIRouter()


@router.post("/confidence")
async def get_confidence_score(
    project: ProjectInput,
):
    """
    Calculate confidence score for an estimate.
    Returns percentage, level (Low/Medium/High), and explanations
    for each factor that affects confidence.
    """
    inp = validate_and_normalize(project)

    # In production, these would come from DB queries
    has_builder_quotes = False
    regional_project_count = 0
    similar_project_count = 0

    confidence = calculate_confidence(
        inp,
        has_builder_quotes=has_builder_quotes,
        regional_project_count=regional_project_count,
        similar_project_count=similar_project_count,
    )

    return {
        "percentage": confidence.percentage,
        "level": confidence.level,
        "factors": confidence.factors,
        "summary": (
            f"Estimate confidence is {confidence.level} ({confidence.percentage}%). "
            f"{len([f for f in confidence.factors if f['impact_value'] < 0])} risk factors, "
            f"{len([f for f in confidence.factors if f['impact_value'] > 0])} positive factors."
        ),
    }
