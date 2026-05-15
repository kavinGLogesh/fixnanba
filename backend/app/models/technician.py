from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class TechnicianBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    shop_name: str = Field(..., min_length=2, max_length=150)
    district: str = Field(..., min_length=2, max_length=100)
    category: str = Field(..., min_length=2, max_length=50)
    phone: str = Field(..., min_length=10, max_length=15)
    email: EmailStr
    address: str = Field(..., min_length=5, max_length=300)
    rating: float = Field(default=4.0, ge=1.0, le=5.0)
    verified: bool = Field(default=False)
    availability: bool = Field(default=True)
    distance: float = Field(default=1.0, ge=0.0)
    image: Optional[str] = None

class TechnicianCreate(TechnicianBase):
    pass

class TechnicianUpdate(BaseModel):
    name: Optional[str] = None
    shop_name: Optional[str] = None
    district: Optional[str] = None
    category: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    rating: Optional[float] = None
    verified: Optional[bool] = None
    availability: Optional[bool] = None
    distance: Optional[float] = None
    image: Optional[str] = None

class TechnicianResponse(TechnicianBase):
    id: str = Field(alias="_id")
    reviews_count: int = 0
    created_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
