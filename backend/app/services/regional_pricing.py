"""
Service 2 — Regional Pricing Engine
Loads city-specific indices and applies regional adjustments to costs.
Every city has independent material, labour, approval, inflation,
transportation, and availability indices.
"""

from app.models.city import City


# ─── Fallback indices (used if city not in DB) ───
DEFAULT_INDICES = {
    "construction_index": 1.0,
    "labour_index": 1.0,
    "material_index": 1.0,
    "approval_index": 1.0,
    "inflation_index": 1.0,
    "transportation_index": 1.0,
    "availability_index": 1.0,
}

# ─── In-memory city data (used when DB is empty or for testing) ───
CITY_DATA: dict[str, dict] = {
    "Mumbai": {"state": "Maharashtra", "labour_index": 1.24, "material_index": 1.15, "approval_index": 1.18, "inflation_index": 1.10, "transportation_index": 1.20, "availability_index": 0.95, "construction_index": 1.18},
    "Delhi NCR": {"state": "Delhi", "labour_index": 1.12, "material_index": 1.08, "approval_index": 1.10, "inflation_index": 1.08, "transportation_index": 1.05, "availability_index": 0.98, "construction_index": 1.08},
    "Gurgaon": {"state": "Haryana", "labour_index": 1.15, "material_index": 1.10, "approval_index": 1.08, "inflation_index": 1.08, "transportation_index": 1.06, "availability_index": 0.97, "construction_index": 1.10},
    "Bangalore": {"state": "Karnataka", "labour_index": 1.08, "material_index": 1.10, "approval_index": 1.05, "inflation_index": 1.06, "transportation_index": 1.08, "availability_index": 0.96, "construction_index": 1.06},
    "Hyderabad": {"state": "Telangana", "labour_index": 0.92, "material_index": 0.96, "approval_index": 0.95, "inflation_index": 1.04, "transportation_index": 0.98, "availability_index": 1.02, "construction_index": 0.96},
    "Pune": {"state": "Maharashtra", "labour_index": 1.02, "material_index": 1.05, "approval_index": 1.00, "inflation_index": 1.05, "transportation_index": 1.02, "availability_index": 1.00, "construction_index": 1.02},
    "Chennai": {"state": "Tamil Nadu", "labour_index": 0.98, "material_index": 1.02, "approval_index": 1.02, "inflation_index": 1.05, "transportation_index": 1.05, "availability_index": 0.98, "construction_index": 1.00},
    "Ahmedabad": {"state": "Gujarat", "labour_index": 0.88, "material_index": 0.92, "approval_index": 0.90, "inflation_index": 1.03, "transportation_index": 0.95, "availability_index": 1.05, "construction_index": 0.92},
    "Kolkata": {"state": "West Bengal", "labour_index": 0.85, "material_index": 0.90, "approval_index": 0.95, "inflation_index": 1.04, "transportation_index": 1.00, "availability_index": 1.00, "construction_index": 0.90},
    "Jaipur": {"state": "Rajasthan", "labour_index": 0.82, "material_index": 0.88, "approval_index": 0.85, "inflation_index": 1.02, "transportation_index": 0.92, "availability_index": 1.05, "construction_index": 0.88},
    "Lucknow": {"state": "Uttar Pradesh", "labour_index": 0.78, "material_index": 0.85, "approval_index": 0.82, "inflation_index": 1.02, "transportation_index": 0.90, "availability_index": 1.08, "construction_index": 0.85},
    "Chandigarh": {"state": "Chandigarh", "labour_index": 0.95, "material_index": 0.98, "approval_index": 0.92, "inflation_index": 1.04, "transportation_index": 0.95, "availability_index": 1.02, "construction_index": 0.95},
    "Kochi": {"state": "Kerala", "labour_index": 0.90, "material_index": 0.95, "approval_index": 0.88, "inflation_index": 1.03, "transportation_index": 1.02, "availability_index": 1.00, "construction_index": 0.92},
    "Indore": {"state": "Madhya Pradesh", "labour_index": 0.75, "material_index": 0.82, "approval_index": 0.80, "inflation_index": 1.01, "transportation_index": 0.88, "availability_index": 1.10, "construction_index": 0.82},
    "Goa": {"state": "Goa", "labour_index": 0.95, "material_index": 1.05, "approval_index": 1.10, "inflation_index": 1.06, "transportation_index": 1.15, "availability_index": 0.90, "construction_index": 1.02},
    "Nagpur": {"state": "Maharashtra", "labour_index": 0.78, "material_index": 0.85, "approval_index": 0.82, "inflation_index": 1.02, "transportation_index": 0.90, "availability_index": 1.05, "construction_index": 0.85},
}


class RegionalIndices:
    """Holds all regional indices for a city."""

    def __init__(self, city_name: str, data: dict):
        self.city = city_name
        self.state = data.get("state", "Unknown")
        self.construction_index = data.get("construction_index", 1.0)
        self.labour_index = data.get("labour_index", 1.0)
        self.material_index = data.get("material_index", 1.0)
        self.approval_index = data.get("approval_index", 1.0)
        self.inflation_index = data.get("inflation_index", 1.0)
        self.transportation_index = data.get("transportation_index", 1.0)
        self.availability_index = data.get("availability_index", 1.0)

    @property
    def composite_index(self) -> float:
        """Weighted composite index for overall cost adjustment."""
        return (
            self.material_index * 0.35 +
            self.labour_index * 0.30 +
            self.transportation_index * 0.10 +
            self.inflation_index * 0.10 +
            self.approval_index * 0.08 +
            self.availability_index * 0.07
        )

    def to_dict(self) -> dict:
        return {
            "city": self.city,
            "state": self.state,
            "construction_index": self.construction_index,
            "labour_index": self.labour_index,
            "material_index": self.material_index,
            "approval_index": self.approval_index,
            "inflation_index": self.inflation_index,
            "transportation_index": self.transportation_index,
            "availability_index": self.availability_index,
            "composite_index": round(self.composite_index, 4),
        }


async def get_regional_indices(city_name: str) -> RegionalIndices:
    """
    Load regional indices for a city.
    Tries DB first, falls back to in-memory data.
    """
    # Try database
    try:
        city = await City.filter(name=city_name).first()
        if city:
            return RegionalIndices(city_name, {
                "state": city.state,
                "construction_index": city.construction_index,
                "labour_index": city.labour_index,
                "material_index": city.material_index,
                "approval_index": city.approval_index,
                "inflation_index": city.inflation_index,
                "transportation_index": city.transportation_index,
                "availability_index": city.availability_index,
            })
    except Exception:
        pass  # Fallback to in-memory if DB is unavailable or uninitialized


    # Fallback to in-memory
    if city_name in CITY_DATA:
        return RegionalIndices(city_name, CITY_DATA[city_name])

    # Unknown city — use national average
    return RegionalIndices(city_name, DEFAULT_INDICES)


def apply_regional_adjustment(base_cost: float, indices: RegionalIndices) -> float:
    """Apply composite regional index to a base cost."""
    return round(base_cost * indices.composite_index)
