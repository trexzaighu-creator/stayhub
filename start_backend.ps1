#!/usr/bin/env pwsh
# Start Django backend
Set-Location "D:\My Personal Project"
$pythonExe = "D:\My Personal Project\.venv\Scripts\python.exe"
$managePy = "D:\My Personal Project\backend_django\manage.py"

Write-Host "Starting Django backend..." -ForegroundColor Green
& $pythonExe $managePy runserver 0.0.0.0:8000
