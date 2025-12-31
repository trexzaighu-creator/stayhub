# PowerShell script to build and run services with Docker Compose and perform a basic smoke test
# Usage: Open PowerShell as admin and run: ./scripts/local_smoke_test.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Running docker-compose build and up..."

# Build and start containers
docker-compose build
docker-compose up -d

Write-Host "Waiting 10 seconds for services to initialize..."
Start-Sleep -Seconds 10

# Check frontend
$frontendUrl = "http://localhost:3000/"
try {
    $f = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 10
    if ($f.StatusCode -eq 200) { Write-Host "Frontend reachable: $frontendUrl" }
} catch {
    Write-Host "Frontend unreachable: $_"
}

# Check API
$apiUrl = "http://localhost:8000/api/"
try {
    $a = Invoke-WebRequest -Uri $apiUrl -UseBasicParsing -TimeoutSec 10
    if ($a.StatusCode -eq 200) { Write-Host "API reachable: $apiUrl" }
} catch {
    Write-Host "API unreachable: $_"
}

Write-Host "Smoke test complete. Tail logs with: docker-compose logs -f"