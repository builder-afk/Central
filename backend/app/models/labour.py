"""
LabourRate model.
Regional labour rates by trade and quality tier.
"""

from tortoise import fields
from tortoise.models import Model
import enum


class Trade(str, enum.Enum):
    MASON = "mason"
    CARPENTER = "carpenter"
    ELECTRICIAN = "electrician"
    PLUMBER = "plumber"
    PAINTER = "painter"
    HELPER = "helper"
    CIVIL_CONTRACTOR = "civil_contractor"
    INTERIOR_CONTRACTOR = "interior_contractor"


class LabourRate(Model):
    id = fields.IntField(pk=True)
    city = fields.ForeignKeyField("models.City", related_name="labour_rates", index=True)
    trade = fields.CharEnumField(Trade, index=True)
    quality_tier = fields.CharField(max_length=20, default="standard")

    daily_rate = fields.FloatField()  # ₹ per day

    effective_date = fields.DatetimeField(auto_now_add=True)
    last_updated = fields.DatetimeField(auto_now=True)

    class Meta:  # type: ignore
        table = "labour_rates"

    def __repr__(self) -> str:
        return f"<LabourRate {self.trade.value} ₹{self.daily_rate}/day>"
