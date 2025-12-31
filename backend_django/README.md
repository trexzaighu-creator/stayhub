# Django backend for Hostel Booking

Quick start:


1. Create virtualenv and install requirements:

```powershell
python -m venv .venv
& .venv\Scripts\Activate.ps1
pip install -r backend_django\requirements.txt
```

2. Copy `.env.example` to `.env` and adjust secrets (optional):

```powershell
copy backend_django\.env.example backend_django\.env
```

3. Run migrations and create a superuser:

```powershell
python backend_django\manage.py migrate
python backend_django\manage.py createsuperuser
```

4. Start development server (option A: local Python, option B: Docker)

Option A — local Python (quick dev):

```powershell
& .venv\Scripts\Activate.ps1
python backend_django\manage.py migrate
python backend_django\manage.py runserver 0.0.0.0:8000
```

Option B — Docker (recommended for parity with production):

```powershell
docker compose up --build
```

Notes:
- Media uploads are stored in `backend_django/uploads/` during development.
- Use the `load_db` management command to import sample data from the old MERN `server/db.json` (if present).

