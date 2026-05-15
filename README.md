# FixNanba 🔧⚡

**Tamil Nadu's #1 Emergency Home & Shop Repair Platform**

Get verified electricians, plumbers, AC technicians, and more at your door within 60 minutes.

---

## 🗂️ Project Structure

```
fixnanba/
├── frontend/                  # React.js + MUI frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── TechnicianCard.jsx
│   │   │   ├── EmergencyPopup.jsx
│   │   │   ├── DangerLevelBadge.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── SOSButton.jsx
│   │   │   └── MobileBottomNav.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── TechniciansPage.jsx
│   │   │   ├── EmergencyPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── context/
│   │   │   ├── LanguageContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── i18n/
│   │   │   ├── en.json          # English translations
│   │   │   └── ta.json          # Tamil translations
│   │   ├── services/
│   │   │   └── api.js           # Axios API calls
│   │   ├── theme/
│   │   │   └── theme.js         # MUI theme
│   │   ├── data/
│   │   │   └── staticData.js    # Districts, categories, diagnosis data
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── backend/                   # FastAPI + MongoDB backend
    ├── app/
    │   ├── main.py             # FastAPI app entry point
    │   ├── config/
    │   │   └── settings.py
    │   ├── database/
    │   │   └── connection.py   # MongoDB Atlas connection + seeding
    │   ├── models/
    │   │   ├── technician.py
    │   │   └── review.py
    │   ├── routers/
    │   │   ├── auth.py
    │   │   ├── technicians.py
    │   │   ├── categories.py
    │   │   ├── districts.py
    │   │   ├── reviews.py
    │   │   └── diagnosis.py
    │   ├── auth/
    │   │   ├── jwt.py
    │   │   └── dependencies.py
    │   └── utils/
    │       └── helpers.py
    ├── requirements.txt
    └── .env
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB Atlas account (free tier works)

---

### 1. MongoDB Atlas Setup

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with password
4. Get your connection string: `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/fixnanba`
5. Whitelist your IP (or use `0.0.0.0/0` for development)

---

### 2. Backend Setup

```bash
cd fixnanba/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env .env.local
# Edit .env and set your MONGODB_URL

# Run the server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**  
API docs at: **http://localhost:8000/docs**

---

### 3. Frontend Setup

```bash
cd fixnanba/frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🔐 Admin Access

| Field    | Value          |
| -------- | -------------- |
| URL      | `/admin/login` |
| Username | `admin`        |
| Password | `admin123`     |

---

## 🌐 Environment Variables

### Backend `.env`

| Variable                      | Description                     | Default                     |
| ----------------------------- | ------------------------------- | --------------------------- |
| `MONGODB_URL`                 | MongoDB Atlas connection string | `mongodb://localhost:27017` |
| `DATABASE_NAME`               | Database name                   | `fixnanba`                  |
| `SECRET_KEY`                  | JWT secret key                  | Change in production!       |
| `ALGORITHM`                   | JWT algorithm                   | `HS256`                     |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime                  | `1440` (24h)                |
| `ADMIN_USERNAME`              | Admin login username            | `admin`                     |
| `ADMIN_PASSWORD`              | Admin login password            | `admin123`                  |
| `CORS_ORIGINS`                | Allowed frontend origins        | `http://localhost:3000`     |

### Frontend `.env` (create in `frontend/`)

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

| Method   | Endpoint            | Description                           | Auth     |
| -------- | ------------------- | ------------------------------------- | -------- |
| `POST`   | `/auth/login`       | Admin login → JWT                     | ❌       |
| `GET`    | `/technicians`      | List technicians (filter/search/page) | ❌       |
| `GET`    | `/technicians/{id}` | Get technician by ID                  | ❌       |
| `POST`   | `/technicians`      | Add technician                        | ✅ Admin |
| `PUT`    | `/technicians/{id}` | Update technician                     | ✅ Admin |
| `DELETE` | `/technicians/{id}` | Delete technician                     | ✅ Admin |
| `GET`    | `/categories`       | List categories                       | ❌       |
| `GET`    | `/districts`        | List TN districts                     | ❌       |
| `GET`    | `/reviews`          | Get reviews                           | ❌       |
| `POST`   | `/reviews`          | Submit a review                       | ❌       |
| `POST`   | `/diagnosis`        | Smart problem diagnosis               | ❌       |
| `GET`    | `/health`           | Health check                          | ❌       |

### Technicians Query Params

```
GET /technicians?district=Chennai&category=electrical&search=rajesh&page=1&limit=20
```

---

## 🗺️ SEO-Friendly Routes

| Route                     | Description                |
| ------------------------- | -------------------------- |
| `/electrician/:district`  | Electricians in a district |
| `/plumber/:district`      | Plumbers in a district     |
| `/cctv-repair/:district`  | CCTV technicians           |
| `/ac-repair/:district`    | AC repair technicians      |
| `/pest-control/:district` | Pest control services      |

---

## 🌍 Language System

The app fully supports **English** and **Tamil** with zero mixing:

- Toggle via language switcher in the navbar
- Persisted in `localStorage`
- All labels, buttons, popups, alerts, validations switch completely
- Translation files: `src/i18n/en.json` and `src/i18n/ta.json`

---

## 🎨 Features

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| Hero section with emergency CTA          | ✅     |
| Problem category cards (7 types)         | ✅     |
| Smart AI diagnosis with danger level     | ✅     |
| Emergency popup (red pulse for critical) | ✅     |
| Technician cards with call/email buttons | ✅     |
| `tel:` / `mailto:` deep links            | ✅     |
| District-based filtering                 | ✅     |
| Customer reviews                         | ✅     |
| Safety tips section                      | ✅     |
| Admin panel (CRUD technicians)           | ✅     |
| JWT authentication                       | ✅     |
| Floating SOS button                      | ✅     |
| Mobile bottom navigation                 | ✅     |
| Full Tamil / English i18n                | ✅     |
| Glassmorphism UI                         | ✅     |
| Mobile-first responsive design           | ✅     |
| MongoDB Atlas integration                | ✅     |
| Auto data seeding on first run           | ✅     |

---

## 🏗️ Production Deployment

### Backend Deployment (Render)

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect Repository**: Link your GitHub repository
3. **Create Web Service**:
   - Service Type: `Web Service`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**:
   ```
   MONGODB_URL=your_mongodb_atlas_url
   DATABASE_NAME=fixnanba
   SECRET_KEY=your_secure_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_admin_password
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```
5. **Deploy**: Click "Create Web Service"

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Connect Repository**: Link your GitHub repository
3. **Deploy**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-render-backend-url.onrender.com
   ```
5. **Deploy**: Click "Deploy"

### Post-Deployment Steps

1. **Update CORS**: Update `CORS_ORIGINS` in Render with your Vercel domain
2. **Test API**: Visit `https://your-backend.onrender.com/docs` to test API
3. **Test Frontend**: Visit your Vercel domain to test the full application

---

## 🛡️ MongoDB Collections

| Collection          | Description              |
| ------------------- | ------------------------ |
| `technicians`       | All repair professionals |
| `categories`        | Service categories       |
| `districts`         | Tamil Nadu districts     |
| `reviews`           | Customer reviews         |
| `emergency_reports` | Emergency call logs      |

---

## 👨‍💻 Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React.js 18, MUI v5, React Router v6, Axios |
| Backend  | FastAPI (Python 3.10+)                      |
| Database | MongoDB Atlas (Motor async driver)          |
| Auth     | JWT (python-jose)                           |
| Fonts    | Poppins, Inter, Noto Sans Tamil             |

---

## 📞 Support

- Platform: FixNanba
- Coverage: All 33 Tamil Nadu districts
- Emergency hotline: **1800-FIX-NANBA**
- Available: 24/7

---

_Made with ❤️ for Tamil Nadu_
