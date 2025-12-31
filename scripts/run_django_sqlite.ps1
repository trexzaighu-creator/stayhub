$env:DB_ENGINE = ""
$env:DB_NAME = "db.sqlite3"
Set-Location "D:\My Personal Project\backend_django"
python manage.py migrate --noinput
python manage.py runserver 0.0.0.0:8000
