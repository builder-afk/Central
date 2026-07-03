"""
BuilderRate model.
Stores per-builder pricing by city and quality tier.
"""

from tortoise import fields
from tortoise.models import Model


class BuilderRate(Model):
    id = fields.IntField(pk=True)
    builder_id = fields.CharField(max_length=50, index=True)
    city = fields.ForeignKeyField("models.City", related_name="builder_rates", index=True)

    construction_type = fields.CharField(max_length=50)  # residential, commercial
    quality_tier = fields.CharField(max_length=20)  # economy, standard, premium, luxury

    rate_per_sqft = fields.FloatField()

    last_updated = fields.DatetimeField(auto_now=True)

    class Meta:  # type: ignore
        table = "builder_rates"

    def __repr__(self) -> str:
        return f"<BuilderRate builder={self.builder_id} ₹{self.rate_per_sqft}/sqft>"
