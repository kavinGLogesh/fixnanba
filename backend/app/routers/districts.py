from fastapi import APIRouter
from app.database.connection import get_db
from app.utils.helpers import fix_ids

router = APIRouter(prefix="/districts", tags=["Districts"])

@router.get("")
async def get_districts():
    db = get_db()
    districts = await db.districts.find().sort("name", 1).to_list(length=50)
    return fix_ids(districts)
