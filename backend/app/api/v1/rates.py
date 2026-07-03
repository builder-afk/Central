"""
GET /regional-rates/{city} — City rates and indices
GET /builder-market-rate — Market rate statistics
"""

from fastapi import APIRouter, Query
from app.services.regional_pricing import get_regional_indices, CITY_DATA
from app.services.builder_intelligence import get_market_rates

router = APIRouter()


@router.get("/regional-rates/{city}")
async def get_regional_rates(
    city: str,
):
    """
    Get regional construction indices and rates for a city.
    """
    indices = await get_regional_indices(city)

    # Base rates (national average before regional adjustment)
    base_rates = {
        "economy": 1400,
        "standard": 1800,
        "premium": 2500,
        "luxury": 3500,
        "ultra_luxury": 5500,
    }

    # Effective rates (after applying composite index)
    effective_rates = {
        tier: round(rate * indices.composite_index)
        for tier, rate in base_rates.items()
    }

    return {
        "city": indices.city,
        "state": indices.state,
        "construction_index": indices.construction_index,
        "labour_index": indices.labour_index,
        "material_index": indices.material_index,
        "approval_index": indices.approval_index,
        "inflation_index": indices.inflation_index,
        "transportation_index": indices.transportation_index,
        "availability_index": indices.availability_index,
        "composite_index": round(indices.composite_index, 4),
        "base_rates": base_rates,
        "effective_rates": effective_rates,
    }


@router.get("/regional-rates")
async def list_all_cities():
    """List all supported cities with their indices."""
    cities = []
    for city_name, data in CITY_DATA.items():
        indices = await get_regional_indices(city_name)
        city_dict = indices.to_dict()
        
        base_rates = {
            "economy": 1400,
            "standard": 1800,
            "premium": 2500,
            "luxury": 3500,
            "ultra_luxury": 5500,
        }
        
        city_dict["effective_rates"] = {
            tier: round(rate * indices.composite_index)
            for tier, rate in base_rates.items()
        }
        cities.append(city_dict)
    return {"cities": cities, "count": len(cities)}


@router.get("/builder-market-rate")
async def get_builder_market_rate(
    city: str = Query(..., description="City name"),
    quality_tier: str = Query(default="standard", description="Quality tier"),
    project_type: str = Query(default="residential", description="Project type"),
):
    """
    Get market rate statistics from builder quotes.
    """
    intel = await get_market_rates(city, quality_tier, project_type)
    return {
        "city": city,
        "quality_tier": quality_tier,
        "project_type": project_type,
        "stats": intel.to_dict(),
    }
