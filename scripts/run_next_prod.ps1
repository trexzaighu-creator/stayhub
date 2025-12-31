Set-Location "D:\My Personal Project\frontend_next"
# Start Next.js production server in background and redirect output
Start-Process -FilePath npm -ArgumentList 'run','start' -NoNewWindow -RedirectStandardOutput '.\next_start.log' -RedirectStandardError '.\next_start.err' -PassThru | Out-Null
Write-Host "Started Next.js (logs: frontend_next\next_start.log)"
