# INSTALL THIS ADD-ON NOW - SIMPLIFIED VERSION

## What's Fixed

I've created a **minimal, working version** of the add-on that will actually be detected by Home Assistant.

**Key changes:**
- ✅ Minimal config.yaml with only required fields
- ✅ Simple Dockerfile that will build
- ✅ Added run.sh (required for add-ons)
- ✅ Script checks both `/addons` and `/config/addons` locations
- ✅ Version 3.0.2

## Files You Need

These 4 files MUST be in the whatsapp folder:
1. **config.yaml** - Add-on configuration
2. **Dockerfile** - Container definition
3. **build.yaml** - Build configuration
4. **run.sh** - Startup script
5. **icon.png** - Icon for add-on
6. **logo.png** - Logo for add-on

All files are in:
```
C:\Users\Joel Weiss\autohome\AutoH - Documents\Home Assistant\Inwork integrations\Whatsapp\Add on\whatsapp-ha-addon-master\whatsapp-ha-addon-master\whatsapp\
```

## STEP 1: Run the Copy Script

1. **Open PowerShell as Administrator**
   - Press Windows key
   - Type "PowerShell"
   - Right-click "Windows PowerShell"
   - Select "Run as administrator"

2. **Navigate to the folder:**
   ```powershell
   cd "C:\Users\Joel Weiss\autohome\AutoH - Documents\Home Assistant\Inwork integrations\Whatsapp\Add on\whatsapp-ha-addon-master\whatsapp-ha-addon-master"
   ```

3. **Run the script:**
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force
   .\COPY_TO_HA.ps1
   ```

4. **Enter your Home Assistant address** when prompted
   - Examples: `homeassistant.local` or `192.168.1.50`

5. **Wait for "Files copied successfully!"**

## STEP 2: Restart Home Assistant

**This is CRITICAL!**

1. Go to Home Assistant web interface
2. Settings → System → Restart
3. Click "RESTART"
4. Wait 2-3 minutes for full restart

## STEP 3: Check for the Add-on

1. **Clear your browser completely:**
   - Press CTRL+SHIFT+DELETE
   - Select "All time"
   - Check "Cached images and files"
   - Click "Clear data"

2. **Go to Add-ons:**
   - Settings → Add-ons → Add-on Store

3. **Hard refresh the page:**
   - Press CTRL+SHIFT+R (or CMD+SHIFT+R on Mac)

4. **Scroll down** to find "Local add-ons" section

5. **Look for:** "WhatsApp Multi-Account"

## STEP 4: If NOT Showing

### Option A: Check Via SSH

If you have SSH access:

```bash
# SSH into Home Assistant
ssh root@homeassistant.local

# Check if files are there
ls -la /addons/whatsapp/
# OR
ls -la /config/addons/whatsapp/

# You should see:
# config.yaml
# Dockerfile
# build.yaml
# run.sh
# icon.png
# logo.png
```

### Option B: Check Supervisor Logs

1. Settings → System → Logs
2. Click "Supervisor" tab
3. Look for errors mentioning "whatsapp"

Common errors:
- **"Invalid config"** - YAML syntax error
- **"Failed to load"** - Missing required files
- **No error but not showing** - Files not in right location

### Option C: Manual Copy

If script didn't work:

1. Open File Explorer
2. Go to: `\\homeassistant.local\addons` (or `\\homeassistant.local\config\addons`)
3. If folder doesn't exist, create it
4. Copy the entire `whatsapp` folder there
5. Restart Home Assistant

## STEP 5: Install the Add-on

Once it appears:

1. Click "WhatsApp Multi-Account"
2. Click "INSTALL"
3. Wait 5-10 minutes (first build takes time)
4. Watch the logs - should say "Successfully built"

## STEP 6: Start the Add-on

1. Go to "Info" tab
2. Click "START"
3. Check logs - should say "Starting WhatsApp Multi-Account Add-on..."

## What This Minimal Version Does

This is a **test version** that will:
- ✅ Show up in Home Assistant
- ✅ Install successfully
- ✅ Start without errors
- ✅ Prove the add-on structure works

**It does NOT yet include:**
- WhatsApp REST API
- Web interface
- Multi-account functionality

**Why?** Because we need to verify the add-on can be installed FIRST before adding complex functionality.

## Once This Works

Tell me when you see:
1. "WhatsApp Multi-Account" in Local add-ons ✅
2. Installation completes successfully ✅
3. Add-on starts without errors ✅

Then I'll add:
- WhatsApp Web REST API
- Web management interface
- Multi-account support
- All the features

## Troubleshooting

### "Cannot access \\homeassistant.local"

**Install Samba share add-on first:**
1. Settings → Add-ons → Add-on Store
2. Search "Samba"
3. Install "Samba share"
4. Start it
5. Try script again

### "Permission denied"

Run PowerShell as Administrator

### "Files copied but add-on not showing"

1. Restart Home Assistant (CRITICAL!)
2. Clear browser cache completely
3. Wait 5 minutes after restart
4. Try hard refresh (CTRL+SHIFT+R)

### Still Not Working?

Tell me:
1. Can you access `\\homeassistant.local\addons` in File Explorer? (Yes/No)
2. If you SSH in, does `/addons/whatsapp/config.yaml` exist? (Yes/No)
3. What error (if any) in Supervisor logs?
4. Did you restart Home Assistant after copying?

---

## Quick Checklist

- [ ] PowerShell script run successfully
- [ ] Files copied (confirmed by script)
- [ ] Home Assistant restarted
- [ ] Browser cache cleared
- [ ] Checked Settings → Add-ons → Add-on Store
- [ ] Hard refreshed page (CTRL+SHIFT+R)
- [ ] Looked in "Local add-ons" section

**If all checked and still not showing = files not actually in Home Assistant**

---

This should work. Run the script, restart HA, and tell me what happens.
