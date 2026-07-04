import uuid
import time
from fastapi import APIRouter
from app.models.contact_inquiry import ContactInquiry
from app.schemas.contact_inquiry import ContactInquiryCreate, ContactInquiryResponse

router = APIRouter(prefix="/contact", tags=["contact"])


def generate_ref_number():
    # Simple ref generator like INQ-1A2B3C
    timestamp = str(int(time.time() * 1000))
    short_uuid = uuid.uuid4().hex[:4].upper()
    return f"INQ-{timestamp[-4:]}{short_uuid}"


@router.post("/", response_model=ContactInquiryResponse, status_code=201)
async def submit_contact_inquiry(inquiry_data: ContactInquiryCreate):
    ref_number = generate_ref_number()
    inquiry = await ContactInquiry.create(
        reference_number=ref_number,
        name=inquiry_data.name,
        email=inquiry_data.email,
        phone=inquiry_data.phone,
        company=inquiry_data.company,
        service=inquiry_data.service,
        source=inquiry_data.source,
        message=inquiry_data.message
    )
    return inquiry
