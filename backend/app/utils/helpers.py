from bson import ObjectId
from typing import Any, Dict

def fix_id(doc: Dict) -> Dict:
    """Convert MongoDB ObjectId _id to string"""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def fix_ids(docs: list) -> list:
    return [fix_id(doc) for doc in docs]

def parse_object_id(id_str: str) -> Any:
    try:
        return ObjectId(id_str)
    except Exception:
        return None
