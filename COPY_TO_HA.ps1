# PowerShell Script to Copy WhatsApp Add-on to Home Assistant
# Run this from Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WhatsApp Add-on Installation Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get Home Assistant address
$haAddress = Read-Host "Enter your Home Assistant address (e.g., homeassistant.local or 192.168.1.100)"

# Construct the network path - try both /addons and /config/addons
$networkPathAddons = "\\$haAddress\addons"
$networkPathConfig = "\\$haAddress\config"

Write-Host ""
Write-Host "Checking connection to Home Assistant..." -ForegroundColor Yellow

# Test if path is accessible
$addonsPath = $null

if (Test-Path $networkPathAddons) {
    Write-Host "[OK] Connected to Home Assistant!" -ForegroundColor Green
    Write-Host "    Path: $networkPathAddons" -ForegroundColor Gray
    $addonsPath = $networkPathAddons
} elseif (Test-Path $networkPathConfig) {
    Write-Host "[OK] Connected to Home Assistant via config!" -ForegroundColor Green
    Write-Host "    Path: $networkPathConfig" -ForegroundColor Gray
    # Create addons folder inside config
    $addonsPath = "$networkPathConfig\addons"
    if (-not (Test-Path $addonsPath)) {
        Write-Host "[INFO] Creating addons folder in config..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $addonsPath | Out-Null
    }
} else {
    Write-Host "[ERROR] Cannot access Home Assistant at: $networkPathAddons or $networkPathConfig" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure 'Samba share' add-on is installed and running in Home Assistant"
    Write-Host "2. Try using the IP address instead: 192.168.x.x"
    Write-Host "3. Check Windows Firewall settings"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Using addons path: $addonsPath" -ForegroundColor Yellow
if (-not (Test-Path $addonsPath)) {
    New-Item -ItemType Directory -Path $addonsPath | Out-Null
    Write-Host "[OK] Created $addonsPath" -ForegroundColor Green
} else {
    Write-Host "[OK] Folder already exists: $addonsPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "Copying WhatsApp add-on files..." -ForegroundColor Yellow

# Source path (where this script is located)
$sourcePath = Join-Path $PSScriptRoot "whatsapp"
$destPath = "$addonsPath\whatsapp"

if (-not (Test-Path $sourcePath)) {
    Write-Host "[ERROR] Source folder not found: $sourcePath" -ForegroundColor Red
    Write-Host "Make sure this script is in the same folder as the 'whatsapp' folder" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Remove old version if exists
if (Test-Path $destPath) {
    Write-Host "[INFO] Removing old version..." -ForegroundColor Yellow
    Remove-Item -Path $destPath -Recurse -Force
}

# Copy files
try {
    Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
    Write-Host "[OK] Files copied successfully!" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Failed to copy files: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Verifying installation..." -ForegroundColor Yellow

# Verify key files
$configFile = "$destPath\config.yaml"
$dockerFile = "$destPath\Dockerfile"

if ((Test-Path $configFile) -and (Test-Path $dockerFile)) {
    Write-Host "[OK] All required files are in place!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Some files are missing!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Open Home Assistant in your browser"
Write-Host "2. Go to: Settings -> Add-ons -> Add-on Store"
Write-Host "3. Press CTRL+SHIFT+R to hard refresh"
Write-Host "4. Scroll down to 'Local add-ons'"
Write-Host "5. Click on 'WhatsApp Multi-Account'"
Write-Host "6. Click 'INSTALL'"
Write-Host ""
Write-Host "If you don't see the add-on:"
Write-Host "- Try restarting Home Assistant"
Write-Host "- Clear your browser cache completely"
Write-Host "- Check supervisor logs in Settings -> System -> Logs"
Write-Host ""

Read-Host "Press Enter to exit"
