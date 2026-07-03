"""
POST /estimate — Full construction cost estimate
GET  /cost-breakdown — Detailed breakdown (re-runs estimate)
"""

from fastapi import APIRouter
from app.schemas.inputs import ProjectInput
from app.schemas.outputs import EstimateResponse
from app.services.cost_calculation import compute_estimate

router = APIRouter()


@router.post("/estimate", response_model=EstimateResponse)
async def create_estimate(
    project: ProjectInput,
):
    """
    Generate a comprehensive construction cost estimate.

    Required fields: location.city, building.builtup_area_sqft, building.floors, quality_tier.
    Everything else has intelligent defaults.

    Returns: estimated cost, cost range, confidence score, detailed breakdown,
    quantities, regional factors, add-on costs, budget tiers, professional fees,
    government charges, contingency, builder margin, AI insights,
    savings opportunities, and recommended builders.
    """
    return await compute_estimate(project)


@router.post("/cost-breakdown", response_model=EstimateResponse)
async def get_cost_breakdown(
    project: ProjectInput,
):
    """
    Same as /estimate — returns full breakdown.
    Alias endpoint for semantic clarity.
    """
    return await compute_estimate(project)
