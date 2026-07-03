"""
MaterialRate + MaterialHistory models.
Tracks current and historical prices for every construction material
by city and quality tier.
"""

from tortoise import fields
from tortoise.models import Model
import enum


class MaterialType(str, enum.Enum):
    CEMENT = "cement"
    STEEL = "steel"
    SAND = "sand"
    AGGREGATE = "aggregate"
    BRICK = "brick"
    AAC_BLOCK = "aac_block"
    PAINT = "paint"
    TILES = "tiles"
    MARBLE = "marble"
    GRANITE = "granite"
    WOOD = "wood"
    GLASS = "glass"
    ELECTRICAL = "electrical"
    PLUMBING = "plumbing"


class QualityTier(str, enum.Enum):
    ECONOMY = "economy"
    STANDARD = "standard"
    PREMIUM = "premium"
    LUXURY = "luxury"
    ULTRA_LUXURY = "ultra_luxury"


class MaterialRate(Model):
    id = fields.IntField(pk=True)
    city = fields.ForeignKeyField("models.City", related_name="material_rates", index=True)
    material_type = fields.CharEnumField(MaterialType, index=True)
    quality_tier = fields.CharEnumField(QualityTier)

    current_rate = fields.FloatField()  # ₹ per unit
    unit = fields.CharField(max_length=20)  # bag, kg, cft, piece, sq.ft
    brand = fields.CharField(max_length=100, null=True)  # Optional brand name

    effective_date = fields.DatetimeField(auto_now_add=True)
    last_updated = fields.DatetimeField(auto_now=True)

    # Reverse relation declared on MaterialHistory via related_name
    history: fields.ReverseRelation["MaterialHistory"]

    class Meta:  # type: ignore
        table = "material_rates"

    def __repr__(self) -> str:
        return f"<MaterialRate {self.material_type.value} {self.quality_tier.value} ₹{self.current_rate}/{self.unit}>"


class MaterialHistory(Model):
    id = fields.IntField(pk=True)
    material_rate = fields.ForeignKeyField(
        "models.MaterialRate", related_name="history", index=True
    )

    rate = fields.FloatField()
    recorded_at = fields.DatetimeField(auto_now_add=True)

    class Meta:  # type: ignore
        table = "material_history"

    def __repr__(self) -> str:
        return f"<MaterialHistory rate={self.rate} at={self.recorded_at}>"
