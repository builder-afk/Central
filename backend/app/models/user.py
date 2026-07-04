"""
User model for authentication and profiling.
"""

from tortoise import fields
from tortoise.models import Model


class User(Model):
    id = fields.IntField(pk=True)
    email = fields.CharField(max_length=255, unique=True, index=True)
    hashed_password = fields.CharField(max_length=255)
    
    full_name = fields.CharField(max_length=255, null=True)
    company = fields.CharField(max_length=255, null=True)
    role = fields.CharField(max_length=100, null=True)
    
    is_active = fields.BooleanField(default=True)
    
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    # Reverse relations
    enquiries: fields.ReverseRelation["Enquiry"]

    class Meta:
        table = "users"
