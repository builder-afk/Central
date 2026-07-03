"""
Rate query and response schemas for the /regional-rates and /builder-market-rate endpoints.
"""

from pydantic import BaseModel
from typing import Optional


class RegionalRatesResponse(BaseModel):
    city: str
    state: str
    construction_index: float
    labour_index: float
    material_index: float
    approval_index: float
    inflation_index: float
    transportation_index: float
    availability_index: float
    base_rates: dict[str, float]  # {"economy": 1400, "standard": 1800, ...}
    effective_rates: dict[str, float]  # after applying indices


class MaterialRateInfo(BaseModel):
    material: str
    unit: str
    economy: Optional[float] = None
    standard: Optional[float] = None
    premium: Optional[float] = None
    luxury: Optional[float] = None


class RegionalRatesDetailResponse(BaseModel):
    city: str
    indices: dict[str, float]
    construction_rates: dict[str, float]
    material_rates: list[MaterialRateInfo]
    labour_rates: dict[str, float]


class MarketRateStats(BaseModel):
    average: float
    median: float
    lowest: float
    highest: float
    weighted_average: float
    sample_size: int


class MarketRateResponse(BaseModel):
    city: str
    quality_tier: str
    project_type: str
    stats: MarketRateStats
    trend: str  # "rising", "stable", "falling"


class BuilderQuoteInput(BaseModel):
    builder_id: str
    city: str
    project_type: str
    builtup_area: float
    floors: int
    quality_tier: str
    quoted_cost: float


class ProjectCompletedInput(BaseModel):
    builder_id: str
    city: str
    project_type: str
    builtup_area: float
    floors: int
    quality_tier: str
    estimated_cost: float
    final_cost: float
    soil_type: Optional[str] = None
    foundation_type: Optional[str] = None
    structural_system: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    duration_months: Optional[int] = None


class HistoricalTrendPoint(BaseModel):
    period: str
    average_rate: float
    project_count: int


class HistoricalTrendsResponse(BaseModel):
    city: str
    quality_tier: str
    trends: list[HistoricalTrendPoint]
    overall_trend: str
