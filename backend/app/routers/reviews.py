from fastapi import APIRouter, Query, status
from typing import Optional
from datetime import datetime
from app.database.connection import get_db
from app.models.review import ReviewCreate
from app.utils.helpers import fix_id, fix_ids

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.get("")
async def get_reviews(
    category: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=50),
):
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    reviews = await db.reviews.find(query).sort("created_at", -1).limit(limit).to_list(length=limit)
    return fix_ids(reviews)

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_review(review: ReviewCreate):
    db = get_db()
    review_dict = review.model_dump()
    review_dict["created_at"] = datetime.utcnow()
    result = await db.reviews.insert_one(review_dict)
    created = await db.reviews.find_one({"_id": result.inserted_id})
    return fix_id(created)
