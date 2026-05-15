from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    print(f"✅ Connected to MongoDB: {settings.DATABASE_NAME}")
    await seed_initial_data()

async def close_db():
    global client
    if client:
        client.close()
        print("❌ MongoDB connection closed")

def get_db():
    return db

async def seed_initial_data():
    """Seed sample data if collections are empty"""
    from datetime import datetime

    # Seed districts
    if await db.districts.count_documents({}) == 0:
        districts = [
            "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
            "Erode", "Tiruppur", "Vellore", "Thoothukudi", "Tirunelveli",
            "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Villupuram",
            "Nagapattinam", "Pudukkottai", "Ramanathapuram", "Virudhunagar",
            "Sivaganga", "Namakkal", "Karur", "Perambalur", "Ariyalur",
            "Krishnagiri", "Dharmapuri", "Nilgiris", "Tiruvannamalai",
            "Kallakurichi", "Ranipet", "Tirupattur", "Chengalpattu", "Tenkasi"
        ]
        await db.districts.insert_many([{"name": d} for d in districts])
        print("✅ Districts seeded")

    # Seed categories
    if await db.categories.count_documents({}) == 0:
        categories = [
            {"id": "electrical", "icon": "⚡", "color": "#FACC15", "bgColor": "#FFF9C4"},
            {"id": "plumbing",   "icon": "🔧", "color": "#3B82F6", "bgColor": "#DBEAFE"},
            {"id": "appliance",  "icon": "🔌", "color": "#8B5CF6", "bgColor": "#EDE9FE"},
            {"id": "carpentry",  "icon": "🪚", "color": "#78716C", "bgColor": "#F5F5F4"},
            {"id": "cctv",       "icon": "📡", "color": "#06B6D4", "bgColor": "#CFFAFE"},
            {"id": "painting",   "icon": "🎨", "color": "#F97316", "bgColor": "#FFEDD5"},
            {"id": "pest",       "icon": "🐛", "color": "#22C55E", "bgColor": "#DCFCE7"},
        ]
        await db.categories.insert_many(categories)
        print("✅ Categories seeded")

    # Seed technicians
    if await db.technicians.count_documents({}) == 0:
        technicians = [
            {
                "name": "Rajesh Kumar", "shop_name": "Rajesh Electricals",
                "district": "Chennai", "category": "electrical",
                "phone": "+919876543210", "email": "rajesh@example.com",
                "address": "Anna Nagar, Chennai", "rating": 4.8,
                "verified": True, "availability": True, "distance": 1.2,
                "reviews_count": 142, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Murugan S", "shop_name": "Murugan Plumbing Works",
                "district": "Coimbatore", "category": "plumbing",
                "phone": "+919876543211", "email": "murugan@example.com",
                "address": "RS Puram, Coimbatore", "rating": 4.6,
                "verified": True, "availability": True, "distance": 2.5,
                "reviews_count": 89, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Selvam AC Services", "shop_name": "Cool Tech Services",
                "district": "Madurai", "category": "appliance",
                "phone": "+919876543212", "email": "selvam@example.com",
                "address": "KK Nagar, Madurai", "rating": 4.9,
                "verified": True, "availability": False, "distance": 3.1,
                "reviews_count": 205, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Karthik Raj", "shop_name": "Karthik Carpentry",
                "district": "Chennai", "category": "carpentry",
                "phone": "+919876543213", "email": "karthik@example.com",
                "address": "Velachery, Chennai", "rating": 4.5,
                "verified": True, "availability": True, "distance": 0.8,
                "reviews_count": 67, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Suresh Networks", "shop_name": "Suresh CCTV & Net",
                "district": "Erode", "category": "cctv",
                "phone": "+919876543214", "email": "suresh@example.com",
                "address": "Erode Main Road", "rating": 4.7,
                "verified": True, "availability": True, "distance": 1.9,
                "reviews_count": 113, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Priya Painters", "shop_name": "Priya Wall Solutions",
                "district": "Salem", "category": "painting",
                "phone": "+919876543215", "email": "priya@example.com",
                "address": "Salem Junction", "rating": 4.4,
                "verified": False, "availability": True, "distance": 4.2,
                "reviews_count": 45, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Anand Pest Control", "shop_name": "SafeHome Pest Solutions",
                "district": "Coimbatore", "category": "pest",
                "phone": "+919876543216", "email": "anand@example.com",
                "address": "Gandhipuram, Coimbatore", "rating": 4.8,
                "verified": True, "availability": True, "distance": 2.1,
                "reviews_count": 178, "image": None, "created_at": datetime.utcnow()
            },
            {
                "name": "Senthil Kumar", "shop_name": "Senthil Electricals",
                "district": "Tiruchirappalli", "category": "electrical",
                "phone": "+919876543217", "email": "senthil@example.com",
                "address": "Thillai Nagar, Trichy", "rating": 4.3,
                "verified": True, "availability": False, "distance": 3.7,
                "reviews_count": 92, "image": None, "created_at": datetime.utcnow()
            },
        ]
        await db.technicians.insert_many(technicians)
        print("✅ Technicians seeded")

    # Seed reviews
    if await db.reviews.count_documents({}) == 0:
        reviews = [
            {
                "name": "Lakshmi D", "district": "Chennai", "rating": 5,
                "category": "electrical",
                "text_en": "The electrician arrived within 45 minutes! Fixed our short circuit and even gave safety advice. Highly recommended.",
                "text_ta": "மின்வாரி 45 நிமிடத்தில் வந்தார்! எங்கள் குறுகிய சுற்றை சரிசெய்து பாதுகாப்பு ஆலோசனையும் கொடுத்தார். மிகவும் பரிந்துரைக்கிறேன்.",
                "created_at": datetime.utcnow()
            },
            {
                "name": "Vijay R", "district": "Coimbatore", "rating": 5,
                "category": "plumbing",
                "text_en": "Pipe burst at midnight, found a plumber through FixNanba in minutes. Life saver! The verified badge really builds trust.",
                "text_ta": "நள்ளிரவில் குழாய் வெடித்தது, FixNanba மூலம் நிமிடங்களில் குழாய்வாரியை கண்டறிந்தோம். உண்மையிலேயே உதவியது!",
                "created_at": datetime.utcnow()
            },
            {
                "name": "Meena S", "district": "Madurai", "rating": 4,
                "category": "appliance",
                "text_en": "AC stopped working during peak summer. FixNanba connected me with a technician who fixed it same day. Excellent service.",
                "text_ta": "கோடையில் ஏசி நின்றுவிட்டது. FixNanba அன்றே சரிசெய்த தொழில்நுட்பரை இணைத்தது. சிறப்பான சேவை.",
                "created_at": datetime.utcnow()
            },
        ]
        await db.reviews.insert_many(reviews)
        print("✅ Reviews seeded")
