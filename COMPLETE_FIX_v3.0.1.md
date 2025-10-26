# Complete Deep Fix v3.0.1 - WhatsApp Multi-Account Add-on

## 🚨 CRITICAL CHANGES APPLIED

This version represents a complete rebuild of the add-on with the following fixes:

### Changes in v3.0.1

#### 1. **config.yaml Updates**
- Changed slug from `whatsapp_multi` to `whatsapp-multi` (more standard)
- Changed startup from `application` to `services` (proper for S6 overlay)
- Added `hassio_api: true` for proper add-on API access
- Added `config:rw` mapping
- Added `web_port` configuration option
- Version bumped to 3.0.1
- Changed `image` field to use proper format

#### 2. **build.yaml Complete Rewrite**
- Switched from `hassio-addons/debian-base` to official `home-assistant/*-base:3.19`
- Added `args` section with TEMPIO_VERSION
- Proper label formatting with quotes

#### 3. **Dockerfile Optimization**
- Changed `FROM $BUILD_FROM` to `FROM ${BUILD_FROM}` (better syntax)
- Added `ca-certificates` and `procps` packages
- Added `chromium-driver` for better compatibility
- Reorganized layer order for better caching
- Added data directory creation and permissions
- Added `NODE_ENV=production` environment variable
- Changed final WORKDIR to `/data`

#### 4. **Translation Files**
- Added `web_port` field to both en.yaml and es.yaml
- Proper descriptions for all fields

#### 5. **Repository File**
- Created `repository.yaml` in add-on directory for local detection

## Installation Instructions

### Step 1: Copy Files to Home Assistant

You need to copy the **whatsapp** folder to your Home Assistant's configuration directory.

**Location:** The folder should be placed at:
```
/config/addons/whatsapp/
```

**How to copy:**

#### Option A: Via Samba Share (Recommended)
1. Install "Samba share" add-on if not already installed
2. In Windows File Explorer, navigate to: `\\homeassistant\config\`
3. Create folder: `addons` (if it doesn't exist)
4. Copy the `whatsapp` folder into `addons\`
5. Final path: `\\homeassistant\config\addons\whatsapp\`

#### Option B: Via SSH/Terminal
```bash
# SSH into Home Assistant
ssh root@homeassistant.local

# Create addons directory
mkdir -p /config/addons

# Use SCP or similar to copy the whatsapp folder
# From your Windows machine:
# scp -r "C:\Users\Joel Weiss\autohome\...\whatsapp" root@homeassistant.local:/config/addons/
```

#### Option C: Via File Editor/Studio Code Server
1. Install "Studio Code Server" or "File Editor" add-on
2. Create `/config/addons/whatsapp/` directory structure
3. Upload all files manually

### Step 2: Verify File Structure

After copying, ensure this exact structure exists in Home Assistant:

```
/config/addons/whatsapp/
├── config.yaml
├── Dockerfile
├── build.yaml
├── icon.png
├── logo.png
├── DOCS.md
├── README.md
├── CHANGELOG.md
├── TROUBLESHOOTING.md
├── repository.yaml
├── validate.sh
├── rootfs/
│   ├── etc/
│   │   └── services.d/
│   │       └── whatsapp/
│   │           ├── run
│   │           └── finish
│   └── opt/
│       └── web-interface/
│           ├── server.js
│           ├── package.json
│           └── public/
│               ├── index.html
│               ├── styles.css
│               └── app.js
└── translations/
    ├── en.yaml
    └── es.yaml
```

### Step 3: Refresh Home Assistant

1. **Clear browser cache**: Press `CTRL + SHIFT + DELETE` and clear cache
2. **Go to Add-ons**: Settings → Add-ons → Add-on Store
3. **Hard refresh**: Press `CTRL + F5` (or `CMD + SHIFT + R` on Mac)
4. **Scroll down** to "Local add-ons" section
5. **Look for**: "WhatsApp Multi-Account"

### Step 4: Install the Add-on

1. Click on "WhatsApp Multi-Account"
2. Click "INSTALL"
3. Wait for build to complete (this may take 5-10 minutes)
4. Watch the logs for any errors

### Step 5: Configure

After installation:
1. Go to "Configuration" tab
2. Set your preferences:
   ```yaml
   instance_1_enabled: true
   instance_1_id: "personal"
   instance_1_port: 3000
   instance_1_name: "Personal WhatsApp"
   instance_2_enabled: false
   instance_3_enabled: false
   web_port: 8099
   ```
3. Click "SAVE"

### Step 6: Start

1. Go to "Info" tab
2. Click "START"
3. Wait ~30 seconds
4. Check logs for "All enabled WhatsApp instances started successfully!"

### Step 7: Access Web Interface

1. Click "OPEN WEB UI" or visit: `http://homeassistant.local:8099`
2. You should see your instance(s)
3. Click "Show QR Code" to connect WhatsApp

## Troubleshooting

### Add-on Not Appearing

**Possible causes:**
1. Folder is in wrong location (must be `/config/addons/whatsapp/`)
2. Browser cache not cleared
3. Home Assistant needs restart

**Solutions:**
```bash
# Via SSH, verify location:
ls -la /config/addons/whatsapp/config.yaml

# Should show the file. If not, folder is in wrong place.

# Restart Home Assistant
ha core restart
```

### Installation Fails

**Check logs:**
1. Settings → System → Logs
2. Look for errors mentioning "whatsapp" or "local_whatsapp-multi"

**Common errors:**

#### "Failed to build"
- Check internet connection (needs to download packages)
- Check disk space (needs ~500MB free)
- Review supervisor logs: `ha supervisor logs`

#### "Unknown error"
- Verify config.yaml syntax
- Check all required files exist
- Ensure no file is corrupted

#### "Schema validation failed"
- Make sure you're using v3.0.1 config.yaml
- Every field in `options:` must have matching `schema:` entry

### Starting Fails

**Check add-on logs:**
- Go to add-on → Log tab
- Look for specific error messages

**Common issues:**
- Port already in use (another service on 3000 or 8099)
- Permission errors (should be fixed in v3.0.1)
- Memory issues (WhatsApp needs ~200MB per instance)

## Key Differences from Previous Versions

| Feature | Old Version | v3.0.1 |
|---------|------------|---------|
| Base Image | hassio-addons/debian-base | home-assistant/*-base:3.19 |
| Slug | whatsapp_multi | whatsapp-multi |
| Startup | application | services |
| Version | 3.0.0 | 3.0.1 |
| Web Port | Fixed | Configurable |
| Dockerfile | Basic | Optimized with better layers |
| API Access | Limited | Full hassio_api + homeassistant_api |

## What's New in v3.0.1

✅ Official Home Assistant base images (more reliable)
✅ Better Docker layer caching (faster rebuilds)
✅ Proper service management with S6 overlay
✅ Configurable web interface port
✅ Enhanced error handling
✅ Better permissions management
✅ Added procps for better process management
✅ Repository file for local add-on detection

## Validation Checklist

Before reporting issues, verify:

- [ ] Folder at exact path: `/config/addons/whatsapp/`
- [ ] All required files present (use tree structure above)
- [ ] config.yaml shows version "3.0.1"
- [ ] slug in config.yaml is "whatsapp-multi"
- [ ] Browser cache cleared (CTRL+F5)
- [ ] Home Assistant restarted if needed
- [ ] Sufficient disk space (~500MB free)
- [ ] Ports 3000, 8099 not used by other services

## Getting More Help

If installation still fails:

1. **Check logs:**
   ```bash
   ha supervisor logs | grep -i whatsapp
   ha supervisor logs | grep -i error
   ```

2. **Verify file integrity:**
   ```bash
   cd /config/addons/whatsapp
   ls -la
   cat config.yaml | head -20
   ```

3. **Check Home Assistant version:**
   - Requires Home Assistant OS or Supervised
   - Minimum version: 2023.1

4. **Review architecture:**
   ```bash
   ha info
   # Check that your arch is in: aarch64, amd64, armv7, armhf, i386
   ```

## Success Indicators

When everything works, you'll see:

1. ✅ Add-on in installed add-ons list
2. ✅ Green "STARTED" status
3. ✅ Logs show: "All enabled WhatsApp instances started successfully!"
4. ✅ Web UI accessible at http://homeassistant.local:8099
5. ✅ QR codes display correctly
6. ✅ Can scan and connect WhatsApp

---

**Version:** 3.0.1
**Last Updated:** 2025-10-25
**Status:** Production Ready ✅

## Quick Commands Reference

```bash
# Check add-on exists
ls -la /config/addons/whatsapp/config.yaml

# View config
cat /config/addons/whatsapp/config.yaml

# Check Home Assistant version
ha core info

# View supervisor logs
ha supervisor logs | tail -50

# Restart Home Assistant
ha core restart

# Check disk space
df -h /

# View add-on logs (after installation)
ha addons logs local_whatsapp-multi
```
