from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.database.connection import get_db
from app.utils.helpers import fix_ids

router = APIRouter(prefix="/diagnosis", tags=["Diagnosis"])

DIAGNOSIS_DATA = {
    "electrical": {
        "burning_smell": {
            "danger": "critical",
            "safety_en": [
                "Turn off main power immediately",
                "Do not touch the switch or socket",
                "Keep children away from the area",
                "Call electrician before restoring power"
            ],
            "safety_ta": [
                "உடனே மெயின் பவரை அணைக்கவும்",
                "சுவிட்ச் அல்லது சாக்கெட்டை தொடாதீர்கள்",
                "குழந்தைகளை பகுதியிலிருந்து விலக்கி வையுங்கள்",
                "மின்சாரம் மீட்டெடுக்கும் முன் மின்வாரியை அழைக்கவும்"
            ],
            "cost_min": 500, "cost_max": 3000,
        },
        "power_trip": {
            "danger": "high",
            "safety_en": [
                "Unplug all heavy appliances",
                "Do not reset breaker repeatedly",
                "Check for overload conditions"
            ],
            "safety_ta": [
                "அனைத்து கனமான கருவிகளையும் அவிழ்த்து விடுங்கள்",
                "பிரேக்கரை மீண்டும் மீண்டும் ரீசெட் செய்யாதீர்கள்",
                "ஓவர்லோட் நிலை உள்ளதா என சரிபாருங்கள்"
            ],
            "cost_min": 300, "cost_max": 2000,
        },
        "no_power": {
            "danger": "medium",
            "safety_en": [
                "Check if neighbors also have no power",
                "Call TNEB helpline 94987-94987",
                "Do not use candles near curtains or flammables"
            ],
            "safety_ta": [
                "அண்டை வீட்டினருக்கும் மின்சாரம் இல்லையா என சரிபாருங்கள்",
                "TNEB ஹெல்ப்லைன் 94987-94987 அழைக்கவும்",
                "திரைச்சீலை அல்லது எரியக்கூடிய பொருட்கள் அருகே மெழுகுவத்தி பயன்படுத்தாதீர்கள்"
            ],
            "cost_min": 200, "cost_max": 1500,
        },
        "sparks": {
            "danger": "critical",
            "safety_en": [
                "Cut main power IMMEDIATELY",
                "Evacuate everyone from the area",
                "Call fire department if fire starts: 101",
                "NEVER use water on electrical fire"
            ],
            "safety_ta": [
                "உடனே மெயின் பவரை துண்டிக்கவும்",
                "அனைவரையும் பகுதியிலிருந்து வெளியேற்றுங்கள்",
                "நெருப்பு பிடித்தால் தீயணைப்பு துறையை அழைக்கவும்: 101",
                "மின் தீயில் ஒருபோதும் தண்ணீர் பயன்படுத்தாதீர்கள்"
            ],
            "cost_min": 1000, "cost_max": 8000,
        },
    },
    "plumbing": {
        "pipe_burst": {
            "danger": "critical",
            "safety_en": [
                "Shut off main water valve immediately",
                "Move valuables and electronics away from water",
                "Do not use electrical devices in the flooded area",
                "Document damage with photos before cleanup"
            ],
            "safety_ta": [
                "உடனே மெயின் வாட்டர் வால்வை மூடுங்கள்",
                "மதிப்புமிக்க பொருட்களை தண்ணீரிலிருந்து விலக்கி வையுங்கள்",
                "வெள்ளம் தழுவிய பகுதியில் மின் சாதனங்களை பயன்படுத்தாதீர்கள்",
                "சுத்தம் செய்வதற்கு முன் படங்கள் எடுத்து சேதத்தை பதிவு செய்யுங்கள்"
            ],
            "cost_min": 800, "cost_max": 5000,
        },
        "blockage": {
            "danger": "low",
            "safety_en": [
                "Do not use chemical drain cleaners excessively",
                "Avoid flushing wipes, tissues or solid objects",
                "Try a plunger as first aid"
            ],
            "safety_ta": [
                "அதிகமாக ரசாயன வடிகால் சுத்தப்படுத்திகளை பயன்படுத்தாதீர்கள்",
                "துடைக்கும் துணி, திசு அல்லது திடப்பொருட்களை ஃப்ளஷ் செய்யாதீர்கள்",
                "முதலுதவியாக ப்ளஞ்சரை முயற்சிக்கவும்"
            ],
            "cost_min": 300, "cost_max": 2000,
        },
        "tap_leak": {
            "danger": "low",
            "safety_en": [
                "Turn off the individual tap isolation valve",
                "Place a bucket to collect dripping water",
                "Avoid water wastage"
            ],
            "safety_ta": [
                "தனி குழாய் தனிமைப்படுத்தல் வால்வை அணைக்கவும்",
                "சொட்டும் தண்ணீர் சேகரிக்க வாளியை வையுங்கள்",
                "தண்ணீர் வீண்விரயத்தை தவிர்க்கவும்"
            ],
            "cost_min": 150, "cost_max": 800,
        },
    },
    "appliance": {
        "ac_not_cooling": {
            "danger": "low",
            "safety_en": [
                "Check thermostat is set to COOL mode",
                "Clean or replace air filter (dirty filter = poor cooling)",
                "Ensure outdoor unit is not blocked or dirty"
            ],
            "safety_ta": [
                "தெர்மோஸ்டாட் COOL மோடில் உள்ளதா சரிபாருங்கள்",
                "ஏர் ஃபில்டரை சுத்தம் செய்யுங்கள் அல்லது மாற்றுங்கள்",
                "வெளிப்புற யூனிட் தடைபடாமல் மற்றும் சுத்தமாக உள்ளதா சரிபாருங்கள்"
            ],
            "cost_min": 500, "cost_max": 4000,
        },
        "fridge_not_cooling": {
            "danger": "medium",
            "safety_en": [
                "Move perishable food to another cooler immediately",
                "Check if the compressor is humming (running)",
                "Do not unplug and replug repeatedly – damages compressor"
            ],
            "safety_ta": [
                "கெட்டுப்போகும் உணவை உடனே வேறு குளிர் பெட்டியில் வையுங்கள்",
                "கம்ப்ரஸர் சத்தம் (இயங்குகிறதா) கேட்கிறதா சரிபாருங்கள்",
                "மீண்டும் மீண்டும் பிளக் போடாதீர்கள் – கம்ப்ரஸருக்கு பாதிப்பை ஏற்படுத்தும்"
            ],
            "cost_min": 700, "cost_max": 5000,
        },
    },
    "carpentry": {
        "door_broken": {
            "danger": "medium",
            "safety_en": [
                "Secure entry with a chair or temporary barricade",
                "Do not force the door repeatedly – may worsen damage",
                "Keep the area well-lit for safety"
            ],
            "safety_ta": [
                "நாற்காலி அல்லது தற்காலிக தடையுடன் நுழைவுவாயிலை பாதுகாக்கவும்",
                "கதவை மீண்டும் மீண்டும் தள்ளாதீர்கள் – சேதத்தை மோசமாக்கும்",
                "பாதுகாப்பிற்காக பகுதியை நன்கு ஒளிரச் செய்யுங்கள்"
            ],
            "cost_min": 300, "cost_max": 2500,
        },
    },
    "cctv": {
        "no_internet": {
            "danger": "low",
            "safety_en": [
                "Restart router: unplug for 30 seconds then plug back in",
                "Check ISP outage map for your area",
                "Inspect all cable connections for loose ends"
            ],
            "safety_ta": [
                "ரூட்டரை மறுதொடக்கம் செய்யுங்கள்: 30 விநாடிகள் அவிழ்த்து மீண்டும் போடுங்கள்",
                "உங்கள் பகுதிக்கான ISP தடை வரைபடத்தை சரிபாருங்கள்",
                "அனைத்து கேபிள் இணைப்புகளிலும் தளர்வான முனைகள் உள்ளதா சரிபாருங்கள்"
            ],
            "cost_min": 200, "cost_max": 1500,
        },
    },
    "painting": {
        "damp_wall": {
            "danger": "medium",
            "safety_en": [
                "Identify moisture source: roof leak vs pipe leak",
                "Keep the area dry with fans or dehumidifier",
                "Avoid using wall sockets in the affected damp area"
            ],
            "safety_ta": [
                "ஈரப்பதத்தின் மூலத்தை கண்டறியுங்கள்: கூரை கசிவு அல்லது குழாய் கசிவு",
                "மின்விசிறி அல்லது ஈரப்பத நீக்கியுடன் பகுதியை வறண்டதாக வையுங்கள்",
                "பாதிக்கப்பட்ட ஈரமான பகுதியில் சுவர் சாக்கெட்டுகளை பயன்படுத்தாதீர்கள்"
            ],
            "cost_min": 1000, "cost_max": 8000,
        },
    },
    "pest": {
        "cockroaches": {
            "danger": "low",
            "safety_en": [
                "Seal all food containers tightly",
                "Do not use excessive DIY sprays – health hazard",
                "Clean kitchen drains and sinks regularly"
            ],
            "safety_ta": [
                "அனைத்து உணவு கொள்கலன்களையும் இறுக்கமாக மூடுங்கள்",
                "அதிகமான DIY ஸ்ப்ரேக்களை பயன்படுத்தாதீர்கள் – உடல்நல அபாயம்",
                "சமையலறை வடிகால்கள் மற்றும் சிங்குகளை தொடர்ந்து சுத்தம் செய்யுங்கள்"
            ],
            "cost_min": 800, "cost_max": 3000,
        },
    },
}

class DiagnosisRequest(BaseModel):
    district: str
    category: str
    problem_id: str

@router.post("")
async def diagnose(req: DiagnosisRequest):
    category_data = DIAGNOSIS_DATA.get(req.category)
    if not category_data:
        raise HTTPException(status_code=404, detail=f"Category '{req.category}' not found")

    problem_data = category_data.get(req.problem_id)
    if not problem_data:
        raise HTTPException(status_code=404, detail=f"Problem '{req.problem_id}' not found")

    # Fetch nearby technicians
    db = get_db()
    techs = await db.technicians.find({
        "district": req.district,
        "category": req.category,
        "availability": True,
    }).sort("rating", -1).limit(3).to_list(length=3)

    return {
        **problem_data,
        "category": req.category,
        "problem_id": req.problem_id,
        "district": req.district,
        "nearby_technicians": fix_ids(techs),
    }
