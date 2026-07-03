from typing import List
from fastapi import APIRouter, Depends
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse
from app.security import get_current_user

router = APIRouter(prefix="/enquiries", tags=["enquiries"])


@router.post("/", response_model=EnquiryResponse, status_code=201)
async def create_enquiry(enquiry_data: EnquiryCreate, current_user: User = Depends(get_current_user)):
    enquiry = await Enquiry.create(
        user=current_user,
        subject=enquiry_data.subject,
        message=enquiry_data.message
    )
    return enquiry


@router.get("/", response_model=List[EnquiryResponse])
async def get_enquiries(current_user: User = Depends(get_current_user)):
    enquiries = await Enquiry.filter(user=current_user).order_by("-created_at")
    return enquiries
