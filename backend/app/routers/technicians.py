from fastapi import APIRouter, HTTPException, Depends, Query, status
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.database.connection import get_db
from app.models.technician import TechnicianCreate, TechnicianUpdate
from app.auth.dependencies import get_current_admin
from app.utils.helpers import fix_id, fix_ids

router = APIRouter(prefix="/technicians", tags=["Technicians"])

@router.get("")
async def get_technicians(
    district: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    availability: Optional[bool] = Query(None),
    verified: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
):
    db = get_db()
    query = {}
    if district:
        query["district"] = district
    if category:
        query["category"] = category
    if availability is not None:
        query["availability"] = availability
    if verified is not None:
        query["verified"] = verified
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"shop_name": {"$regex": search, "$options": "i"}},
            {"district": {"$regex": search, "$options": "i"}},
        ]

    skip = (page - 1) * limit
    total = await db.technicians.count_documents(query)
    cursor = db.technicians.find(query).sort("rating", -1).skip(skip).limit(limit)
    technicians = await cursor.to_list(length=limit)

    return {
        "technicians": fix_ids(technicians),
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit,
    }

@router.get("/{tech_id}")
async def get_technician(tech_id: str):
    db = get_db()
    try:
        tech = await db.technicians.find_one({"_id": ObjectId(tech_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid technician ID")
    if not tech:
        raise HTTPException(status_code=404, detail="Technician not found")
    return fix_id(tech)

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_technician(
    tech: TechnicianCreate,
    admin=Depends(get_current_admin)
):
    db = get_db()
    tech_dict = tech.model_dump()
    tech_dict["created_at"] = datetime.utcnow()
    tech_dict["reviews_count"] = 0
    result = await db.technicians.insert_one(tech_dict)
    created = await db.technicians.find_one({"_id": result.inserted_id})
    return fix_id(created)

@router.put("/{tech_id}")
async def update_technician(
    tech_id: str,
    tech: TechnicianUpdate,
    admin=Depends(get_current_admin)
):
    db = get_db()
    try:
        oid = ObjectId(tech_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid technician ID")

    update_data = {k: v for k, v in tech.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")

    update_data["updated_at"] = datetime.utcnow()
    result = await db.technicians.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Technician not found")

    updated = await db.technicians.find_one({"_id": oid})
    return fix_id(updated)

@router.delete("/{tech_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_technician(
    tech_id: str,
    admin=Depends(get_current_admin)
):
    db = get_db()
    try:
        oid = ObjectId(tech_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid technician ID")

    result = await db.technicians.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Technician not found")
    return None
