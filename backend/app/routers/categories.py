from fastapi import APIRouter
from app.database.connection import get_db
from app.utils.helpers import fix_ids

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("")
async def get_categories():
    db = get_db()
    cats = await db.categories.find().to_list(length=20)
    return fix_ids(cats)
