from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    district: str
    rating: int = Field(..., ge=1, le=5)
    category: str
    text_en: str = Field(..., min_length=10, max_length=1000)
    text_ta: Optional[str] = None

class ReviewResponse(ReviewCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
