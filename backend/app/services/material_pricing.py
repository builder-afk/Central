"""
Service 3 — Material Pricing Engine
Looks up current material rates by city, quality tier, and optional brand.
Returns unit costs for all construction materials.
"""

from app.models.material import MaterialRate as MaterialRateModel, QualityTier
from app.services.regional_pricing import RegionalIndices


# ─── Base material rates (national average, ₹ per unit) ───
# These are fallback rates when DB has no data for a city.

BASE_MATERIAL_RATES: dict[str, dict] = {
    # material_type: {unit, economy, standard, premium, luxury, ultra_luxury}
    "cement": {"unit": "bag", "economy": 350, "standard": 380, "premium": 420, "luxury": 450, "ultra_luxury": 500},
    "steel": {"unit": "kg", "economy": 58, "standard": 65, "premium": 72, "luxury": 82, "ultra_luxury": 95},
    "sand": {"unit": "cft", "economy": 45, "standard": 55, "premium": 65, "luxury": 75, "ultra_luxury": 85},
    "aggregate": {"unit": "cft", "economy": 32, "standard": 38, "premium": 45, "luxury": 52, "ultra_luxury": 60},
    "brick": {"unit": "piece", "economy": 7, "standard": 9, "premium": 11, "luxury": 13, "ultra_luxury": 15},
    "aac_block": {"unit": "piece", "economy": 35, "standard": 45, "premium": 55, "luxury": 65, "ultra_luxury": 75},
    "paint": {"unit": "sqft", "economy": 14, "standard": 22, "premium": 35, "luxury": 55, "ultra_luxury": 80},
    "tiles": {"unit": "sqft", "economy": 35, "standard": 65, "premium": 120, "luxury": 250, "ultra_luxury": 500},
    "marble": {"unit": "sqft", "economy": 80, "standard": 120, "premium": 200, "luxury": 400, "ultra_luxury": 800},
    "granite": {"unit": "sqft", "economy": 60, "standard": 90, "premium": 150, "luxury": 280, "ultra_luxury": 500},
    "wood": {"unit": "cft", "economy": 1200, "standard": 1800, "premium": 2800, "luxury": 4500, "ultra_luxury": 8000},
    "glass": {"unit": "sqft", "economy": 45, "standard": 75, "premium": 140, "luxury": 250, "ultra_luxury": 450},
    "electrical": {"unit": "point", "economy": 800, "standard": 1200, "premium": 1800, "luxury": 2800, "ultra_luxury": 4500},
    "plumbing": {"unit": "point", "economy": 2500, "standard": 4000, "premium": 6500, "luxury": 10000, "ultra_luxury": 18000},
}


class MaterialRates:
    """Container for all material rates for a specific city + quality."""

    def __init__(self, rates: dict[str, dict]):
        self._rates = rates

    def get_rate(self, material: str) -> float:
        """Get the rate for a specific material."""
        return self._rates.get(material, {}).get("rate", 0)

    def get_unit(self, material: str) -> str:
        """Get the unit for a specific material."""
        return self._rates.get(material, {}).get("unit", "unit")

    def to_dict(self) -> dict:
        return self._rates


async def get_material_rates(
    city_name: str,
    quality_tier: str,
    indices: RegionalIndices,
) -> MaterialRates:
    """
    Service 3 entry point.
    Returns material rates adjusted for city and quality.
    """
    rates: dict[str, dict] = {}

    # Map quality tier string to the dict key
    tier = quality_tier.lower().replace(" ", "_")

    for material, base_data in BASE_MATERIAL_RATES.items():
        base_rate = base_data.get(tier, base_data.get("standard", 0))

        # Apply material index from regional pricing
        adjusted_rate = round(base_rate * indices.material_index, 2)

        rates[material] = {
            "rate": adjusted_rate,
            "base_rate": base_rate,
            "unit": base_data["unit"],
            "regional_adjustment": round(indices.material_index, 4),
        }

    # Try to override with DB-specific rates if available
    try:
        try:
            tier_enum = QualityTier(tier)
        except ValueError:
            tier_enum = QualityTier.STANDARD
    
        db_rates = await MaterialRateModel.filter(
            quality_tier=tier_enum,
        ).all()
    
        for db_rate in db_rates:
            material_key = db_rate.material_type.value
            if material_key in rates:
                rates[material_key]["rate"] = db_rate.current_rate
                rates[material_key]["source"] = "database"
    except Exception:
        pass

    return MaterialRates(rates)
