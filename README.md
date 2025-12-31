# Hostel Booking — Django

This repository has been migrated from a MERN stack to a Django backend.

- Backend (Django + DRF): `backend_django/`

Quick start (Windows):

1. Create and activate virtual environment:

```powershell
python -m venv .venv
& .venv\Scripts\Activate.ps1
pip install -r backend_django\requirements.txt
```

2. Run migrations and create superuser:

```powershell
python backend_django\manage.py migrate
python backend_django\manage.py createsuperuser
```

3. Start development server:

```powershell
python backend_django\manage.py runserver 8000
```

The original MERN `client/` and `server/` folders were archived to `archive_mern_<timestamp>.zip` and removed from the repository root.

See `backend_django/README.md` for more backend-specific instructions.
# Hostel Booking (Pakistan) — Demo App

This project is a minimal, runnable demo for students to browse and book hostels in Pakistani cities. It includes:

- Express backend (simple JSON datastore)
- React + Vite frontend with Leaflet map

Quick start (Windows):

1. Open two terminals.
2. Backend:

```powershell
cd "d:/My Personal Project/server"
npm install
npm run start
```

3. Frontend:

```powershell
cd "d:/My Personal Project/client"
npm install
npm run dev
```

API server runs on `http://localhost:4000` by default. Frontend (Vite) runs on `http://localhost:5173`.

Next steps: add authentication, payments, persistent DB (Postgres), and admin UI.

Environment variables:

- Create a `.env` file in the `server` folder with:

```
STRIPE_SECRET_KEY=sk_test_...    # your Stripe secret key for sandbox
JWT_SECRET=some_secure_secret
PORT=4000
```

Notes:
- The server now uses SQLite (`server/db.sqlite`). On first run it will migrate sample data from `server/db.json`.
- Booking flow: users must register/login, then booking creates a Stripe Checkout session and redirects to Stripe. After payment Stripe redirects to `/success`, the frontend calls the server to confirm the payment and finalize the booking.

If you want, I can now: run `npm install` for server and client here, or help you set up Stripe keys and test a payment flow.
