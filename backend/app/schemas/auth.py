from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str
    full_name: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None


class UserLogin(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    full_name: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
