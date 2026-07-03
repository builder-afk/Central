from pydantic import BaseModel
from datetime import datetime
from app.models.enquiry import EnquiryStatus


class EnquiryBase(BaseModel):
    subject: str
    message: str


class EnquiryCreate(EnquiryBase):
    pass


class EnquiryResponse(EnquiryBase):
    id: int
    user_id: int
    status: EnquiryStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
