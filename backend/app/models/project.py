"""
ProjectHistory model.
Every completed project becomes training data for the ML model.
This is the foundation of the self-learning system.
"""

from tortoise import fields
from tortoise.models import Model


class ProjectHistory(Model):
    id = fields.IntField(pk=True)
    city = fields.ForeignKeyField("models.City", related_name="project_history", index=True)
    builder_id = fields.CharField(max_length=50, null=True, index=True)

    # ─── Project specs ───
    project_type = fields.CharField(max_length=50)
    builtup_area = fields.FloatField()
    floors = fields.IntField()
    quality_tier = fields.CharField(max_length=20)

    # ─── Construction details ───
    soil_type = fields.CharField(max_length=50, null=True)
    foundation_type = fields.CharField(max_length=50, null=True)
    structural_system = fields.CharField(max_length=50, null=True)

    # ─── Room configuration ───
    bedrooms = fields.IntField(null=True)
    bathrooms = fields.IntField(null=True)

    # ─── Cost tracking ───
    estimated_cost = fields.FloatField()
    final_cost = fields.FloatField(null=True)
    variance_percent = fields.FloatField(null=True)  # (final - estimated) / estimated * 100

    # ─── Timeline ───
    started_at = fields.DatetimeField(null=True)
    completed_at = fields.DatetimeField(null=True)
    duration_months = fields.IntField(null=True)

    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "project_history"

    def __repr__(self) -> str:
        return f"<ProjectHistory {self.project_type} {self.builtup_area}sqft variance={self.variance_percent}%>"
