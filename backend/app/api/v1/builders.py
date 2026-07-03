"""
POST /builder-quote — Submit a builder quote
GET  /recommended-builders — Builder recommendations
"""

from fastapi import APIRouter, Query
from app.schemas.rates import BuilderQuoteInput
from app.models.quote import BuilderQuote
from app.models.city import City
from app.services.recommendation import match_builders

router = APIRouter()


@router.post("/builder-quote")
async def submit_builder_quote(
    quote: BuilderQuoteInput,
):
    """
    Submit a builder quote. Feeds the pricing intelligence engine.
    Every quote — accepted or not — improves future estimates.
    """
    # Resolve city
    city = await City.filter(name=quote.city).first()
    city_id = city.id if city else 1

    record = await BuilderQuote.create(
        builder_id=quote.builder_id,
        city_id=city_id,
        project_type=quote.project_type,
        builtup_area=quote.builtup_area,
        floors=quote.floors,
        quality_tier=quote.quality_tier,
        quoted_cost=quote.quoted_cost,
        accepted=False,
    )

    return {
        "status": "success",
        "quote_id": record.id,
        "message": "Quote recorded. It will be used to improve estimate accuracy.",
    }


@router.get("/recommended-builders")
async def get_recommended_builders(
    city: str = Query(..., description="City name"),
    quality_tier: str = Query(default="standard"),
    budget: float = Query(default=0, description="Estimated budget in ₹"),
    project_type: str = Query(default="residential"),
):
    """
    Get builder recommendations matched to project requirements.
    """
    matches = await match_builders(city, quality_tier, budget, project_type)
    return {
        "city": city,
        "quality_tier": quality_tier,
        "budget": budget,
        "matches": [m.to_dict() for m in matches],
        "count": len(matches),
    }
