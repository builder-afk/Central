"""
Enquiry model for user enquiries and quote requests.
"""

from tortoise import fields
from tortoise.models import Model
import enum


class EnquiryStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class Enquiry(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField("models.User", related_name="enquiries", index=True)
    
    subject = fields.CharField(max_length=255)
    message = fields.TextField()
    status = fields.CharEnumField(EnquiryStatus, default=EnquiryStatus.PENDING, index=True)
    
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "enquiries"
