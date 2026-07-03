"""
City model — stores regional construction indices.
Every city has independent material, labour, approval, inflation,
transportation, and availability indices that adjust all estimates.
"""

from tortoise import fields
from tortoise.models import Model


class City(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, unique=True, index=True)
    state = fields.CharField(max_length=100)
    pin_code_prefix = fields.CharField(max_length=6, null=True)

    # ─── Regional Indices (1.0 = national average) ───
    construction_index = fields.FloatField(default=1.0)
    labour_index = fields.FloatField(default=1.0)
    material_index = fields.FloatField(default=1.0)
    approval_index = fields.FloatField(default=1.0)
    inflation_index = fields.FloatField(default=1.0)
    transportation_index = fields.FloatField(default=1.0)
    availability_index = fields.FloatField(default=1.0)

    # ─── Base rates (₹/sq.ft) — national baseline ───
    base_rate_economy = fields.FloatField(default=1400.0)
    base_rate_standard = fields.FloatField(default=1800.0)
    base_rate_premium = fields.FloatField(default=2500.0)
    base_rate_luxury = fields.FloatField(default=3500.0)
    base_rate_ultra_luxury = fields.FloatField(default=5500.0)

    last_updated = fields.DatetimeField(auto_now=True)

    class Meta:  # type: ignore
        table = "cities"

    def __repr__(self) -> str:
        return f"<City {self.name}, {self.state}>"
