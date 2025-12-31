# 🏨 Hostel Booking Platform - Quick Reference Guide

## 🚀 Getting Started

### Starting Both Servers

**Backend (Django):**
```powershell
Set-Location "D:\My Personal Project\backend_django"
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py runserver 0.0.0.0:8000
```

**Frontend (Next.js):**
```powershell
Set-Location "D:\My Personal Project\frontend_next"
npm run dev
```

### Access Points
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:8000/api
- 🛠️ **Django Admin**: http://localhost:8000/admin

---

## 📱 Test Accounts

### Regular User
- **Email**: testuser@abc.com
- **Password**: password123
- **Role**: User

### Hostel Owner
- **Email**: owner@hostel.com
- **Password**: password123
- **Role**: Owner

### Admin
- **Email**: admin@hostel.com
- **Password**: password123
- **Role**: Admin

---

## 💰 Pricing Model

### Updated to Monthly PKR
- **Old**: Per-night pricing in USD
- **New**: Monthly rent in Pakistani Rupees (PKR)

### Hostel Pricing Examples
| Hostel | City | Monthly Rent (PKR) |
|--------|------|-------------------|
| Budget Traveler | Karachi | 8,000 |
| City Center | Lahore | 10,000 |
| Capital View | Islamabad | 9,500 |
| Peshawar Heritage | Peshawar | 7,500 |
| Luxury Backpackers | Karachi | 15,000 |
| Sunset Garden | Lahore | 11,000 |

---

## 🗂️ Project Structure

```
D:\My Personal Project/
├── backend_django/                    # Django Backend
│   ├── api/
│   │   ├── models.py                 # User, City, Hostel, Booking
│   │   ├── serializers.py            # DRF Serializers
│   │   ├── views.py                  # API Endpoints
│   │   ├── urls.py                   # URL Routing
│   │   └── admin.py                  # Django Admin Config
│   ├── backend_django/
│   │   └── settings.py               # Django Settings
│   ├── manage.py
│   ├── db.sqlite3                    # SQLite Database
│   └── update_hostels.py             # Seed data script
│
├── frontend_next/                     # Next.js Frontend
│   ├── pages/
│   │   ├── index.tsx                 # Homepage
│   │   ├── hostels.tsx               # Hostels listing
│   │   ├── hostels/[id].tsx          # Detail page
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── owner/
│   │       └── dashboard.tsx         # Owner dashboard
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MapView.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── Rating.tsx
│   │   └── FavoriteButton.tsx
│   ├── lib/
│   │   ├── auth.ts                   # JWT auth helpers
│   │   └── api.ts                    # API client
│   ├── styles/
│   │   └── globals.css               # Global styles & gradients
│   ├── .env.local                    # Environment variables
│   └── next.config.js
│
├── REDESIGN_COMPLETE.md              # This session's changes
├── BUGS_FIXED.md                     # Previous bug fixes
└── [Other documentation files]
```

---

## 🔑 Key API Endpoints

### Hostels
- `GET /api/hostels/` - List all hostels with monthly rent
- `GET /api/hostels/<id>/` - Hostel detail
- `POST /api/hostels/create/` - Create new hostel (owner only)
- `PUT /api/hostels/<id>/update/` - Update hostel (owner only)

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login (returns JWT tokens)
- `POST /api/token/refresh/` - Refresh JWT token

### Bookings
- `GET /api/bookings/` - User's bookings
- `POST /api/bookings/create/` - Create booking
- `POST /api/bookings/<id>/confirm/` - Confirm booking

### Payment
- `POST /api/create-checkout-session/` - Create Stripe checkout session

---

## 🎯 Key Features

### For Travelers ✈️
- ✅ Browse hostels by city, amenities, price (PKR/month)
- ✅ View detailed hostel information with images
- ✅ See hostel ratings and reviews
- ✅ Add hostels to wishlist (localStorage)
- ✅ Book hostels securely
- ✅ View booking history

### For Owners 🏠
- ✅ Create and manage multiple hostels
- ✅ Set monthly rent in PKR
- ✅ Upload hostel photos
- ✅ Add amenities and features
- ✅ View booking statistics
- ✅ Track monthly revenue
- ✅ Manage room and seat availability

### Platform 🌐
- ✅ JWT authentication with access/refresh tokens
- ✅ CORS-enabled REST API
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with gradients and animations
- ✅ Interactive map integration
- ✅ Image carousel for hostels
- ✅ Advanced filtering system

---

## 🔧 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 13.4, TypeScript, Tailwind CSS |
| **Backend** | Django 6.0, Django REST Framework 3.16 |
| **Database** | SQLite (dev), PostgreSQL (production) |
| **Authentication** | SimpleJWT 5.5 |
| **Payment** | Stripe API |
| **Styling** | Tailwind CSS 3.4 |
| **Mapping** | React-Leaflet |
| **Data Fetching** | SWR |

---

## 🐛 Common Issues & Solutions

### Django Server Won't Start
```powershell
# Make sure venv is activated
Set-Location "D:\My Personal Project\backend_django"
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py check
```

### Frontend shows blank page
```powershell
# Clear Next.js cache and rebuild
Remove-Item ".next" -Recurse -Force
npm run dev
```

### API returning 500 errors
```powershell
# Check migrations are applied
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py migrate
```

### Port already in use
```powershell
# Find process on port and kill it
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## 📊 Database Maintenance

### Create Superuser
```powershell
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py createsuperuser
```

### Reset Database
```powershell
# Backup first! Then:
Remove-Item db.sqlite3
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py migrate
& "D:\My Personal Project\.venv\Scripts\python.exe" update_hostels.py
```

### Shell Access
```powershell
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py shell
```

---

## 🚀 Deployment Checklist

- [ ] Update `ALLOWED_HOSTS` in Django settings
- [ ] Set `DEBUG=False` in production
- [ ] Configure PostgreSQL for production
- [ ] Set up proper SECRET_KEY
- [ ] Enable HTTPS/SSL
- [ ] Configure Stripe production keys
- [ ] Set up email backend
- [ ] Run security checks: `manage.py check --deploy`
- [ ] Collect static files: `manage.py collectstatic`

---

## 💡 Tips & Tricks

### Quick Testing
```powershell
# Create test user
& "D:\My Personal Project\.venv\Scripts\python.exe" manage.py shell
>>> from api.models import User
>>> User.objects.create_user(email='test@test.com', password='pass123')

# Get all hostels with pricing
>>> from api.models import Hostel
>>> for h in Hostel.objects.all():
...     print(f"{h.name}: PKR {h.monthly_rent}/month")
```

### View Logs
- Django: Check terminal output
- Next.js: Check browser console (F12)
- Database: `backend_django/db.sqlite3`

### API Testing
```powershell
# Test endpoint
$r = Invoke-WebRequest "http://127.0.0.1:8000/api/hostels/" -UseBasicParsing
$r.Content | ConvertFrom-Json
```

---

## 📞 Support

For issues or questions:
1. Check the error messages in terminal/console
2. Review `BUGS_FIXED.md` for known issues
3. Check Django logs with: `manage.py runserver --verbosity 2`

---

**Last Updated**: December 31, 2025
**Version**: 2.0 - Complete Redesign with Monthly PKR Pricing
