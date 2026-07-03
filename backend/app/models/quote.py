"""
BuilderQuote model.
Every quote submitted by a builder, whether accepted or rejected,
feeds the pricing intelligence and ML training pipeline.
"""

from tortoise import fields
from tortoise.models import Model


class BuilderQuote(Model):
    id = fields.IntField(pk=True)
    builder_id = fields.CharField(max_length=50, index=True)
    city = fields.ForeignKeyField("models.City", related_name="builder_quotes", index=True)

    project_type = fields.CharField(max_length=50)  # villa, apartment, independent house
    builtup_area = fields.FloatField()
    floors = fields.IntField()
    quality_tier = fields.CharField(max_length=20)

    quoted_cost = fields.FloatField()
    accepted = fields.BooleanField(default=False)
    actual_completion_cost = fields.FloatField(null=True)  # Filled after project completion

    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "builder_quotes"

    def __repr__(self) -> str:
        return f"<BuilderQuote builder={self.builder_id} ₹{self.quoted_cost} accepted={self.accepted}>"
