"""
Contact Inquiry model for public contact forms.
"""

from tortoise import fields
from tortoise.models import Model
from app.models.enquiry import EnquiryStatus


class ContactInquiry(Model):
    id = fields.IntField(pk=True)
    reference_number = fields.CharField(max_length=50, unique=True, index=True)
    name = fields.CharField(max_length=255)
    email = fields.CharField(max_length=255)
    phone = fields.CharField(max_length=50, null=True)
    company = fields.CharField(max_length=255, null=True)
    service = fields.CharField(max_length=100, null=True)
    source = fields.CharField(max_length=100, null=True)
    message = fields.TextField()
    
    status = fields.CharEnumField(EnquiryStatus, default=EnquiryStatus.PENDING, index=True)
    
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "contact_inquiries"
