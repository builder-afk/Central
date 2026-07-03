"""
POST /project-completed — Record a completed project (feeds ML training)
GET  /historical-trends/{city} — Historical cost trends
"""

from fastapi import APIRouter, Query
from app.schemas.rates import ProjectCompletedInput
from app.models.project import ProjectHistory
from app.models.city import City

router = APIRouter()


@router.post("/project-completed")
async def record_completed_project(
    project: ProjectCompletedInput,
):
    """
    Record a completed construction project.
    Every completed project becomes training data for the ML model.
    This is the foundation of the self-learning system.
    """
    # Resolve city
    city = await City.filter(name=project.city).first()
    city_id = city.id if city else 1

    # Calculate variance
    variance = 0.0
    if project.estimated_cost > 0:
        variance = round(
            (project.final_cost - project.estimated_cost) / project.estimated_cost * 100, 2
        )

    record = await ProjectHistory.create(
        city_id=city_id,
        builder_id=project.builder_id,
        project_type=project.project_type,
        builtup_area=project.builtup_area,
        floors=project.floors,
        quality_tier=project.quality_tier,
        soil_type=project.soil_type,
        foundation_type=project.foundation_type,
        structural_system=project.structural_system,
        bedrooms=project.bedrooms,
        bathrooms=project.bathrooms,
        estimated_cost=project.estimated_cost,
        final_cost=project.final_cost,
        variance_percent=variance,
        duration_months=project.duration_months,
    )

    return {
        "status": "success",
        "project_id": record.id,
        "variance_percent": variance,
        "message": "Project recorded. ML model will be updated with this data.",
    }


@router.get("/historical-trends/{city}")
async def get_historical_trends(
    city: str,
    quality_tier: str = Query(default="standard"),
):
    """
    Get historical cost trends for a city.
    """
    city_record = await City.filter(name=city).first()
    if not city_record:
        return {"city": city, "quality_tier": quality_tier, "trends": [], "overall_trend": "insufficient_data"}

    projects = await ProjectHistory.filter(
        city_id=city_record.id,
        quality_tier=quality_tier,
        final_cost__isnull=False,
    ).order_by("completed_at").all()

    if not projects:
        return {"city": city, "quality_tier": quality_tier, "trends": [], "overall_trend": "insufficient_data"}

    # Group by rough periods and calculate averages
    trends = []
    for p in projects:
        rate = p.final_cost / (p.builtup_area * p.floors) if p.builtup_area and p.floors else 0
        trends.append({
            "period": str(p.completed_at.year) if p.completed_at else "unknown",
            "average_rate": round(rate, 2),
            "project_count": 1,
        })

    overall = "stable"
    if len(trends) >= 2:
        first_half = sum(t["average_rate"] for t in trends[:len(trends)//2]) / max(1, len(trends)//2)
        second_half = sum(t["average_rate"] for t in trends[len(trends)//2:]) / max(1, len(trends) - len(trends)//2)
        if second_half > first_half * 1.05:
            overall = "rising"
        elif second_half < first_half * 0.95:
            overall = "falling"

    return {
        "city": city,
        "quality_tier": quality_tier,
        "trends": trends,
        "overall_trend": overall,
    }
