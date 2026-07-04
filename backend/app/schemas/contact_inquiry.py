from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.enquiry import EnquiryStatus


class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    message: str
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    source: Optional[str] = None


class ContactInquiryResponse(BaseModel):
    id: int
    reference_number: str
    name: str
    email: str
    status: EnquiryStatus
    created_at: datetime
    
    class Config:
        from_attributes = True
