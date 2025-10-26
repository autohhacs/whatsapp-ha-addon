# WHERE TO PUT THE ADD-ON FILES

## CRITICAL: The Path Must Be EXACTLY This

```
\\homeassistant.local\addons\whatsapp\
```

**NOT** `\\homeassistant.local\config\addons\whatsapp\`
**NOT** `\\homeassistant.local\config\whatsapp\`

It's `\addons\whatsapp\` at the ROOT level.

---

## Step 1: Access Samba

1. Make sure **Samba share** add-on is installed and running in Home Assistant
2. Open Windows File Explorer (Windows+E)
3. In the address bar, type: `\\homeassistant.local\addons`
   - Or use your IP: `\\192.168.1.x\addons`
4. Press Enter

**If you get an error:**
- Install Samba share add-on first (Settings → Add-ons → search "Samba")
- Try your IP address instead of homeassistant.local
- You may need to enter your Home Assistant username/password

## Step 2: Copy the Whatsapp Folder

1. You should see the `addons` folder (may be empty)
2. Copy the ENTIRE `whatsapp` folder from:
   ```
   C:\Users\Joel Weiss\autohome\AutoH - Documents\Home Assistant\Inwork integrations\Whatsapp\Add on\whatsapp-ha-addon-master\whatsapp-ha-addon-master\whatsapp
   ```
3. Paste it into `\\homeassistant.local\addons\`

**Final result should be:**
```
\\homeassistant.local\addons\whatsapp\config.yaml
\\homeassistant.local\addons\whatsapp\Dockerfile
\\homeassistant.local\addons\whatsapp\build.yaml
\\homeassistant.local\addons\whatsapp\run.sh
\\homeassistant.local\addons\whatsapp\icon.png
\\homeassistant.local\addons\whatsapp\logo.png
```

## Step 3: Restart Home Assistant

1. In Home Assistant: Settings → System → Restart
2. Click RESTART
3. Wait 2-3 minutes

## Step 4: Check Add-ons Store

1. Settings → Add-ons → Add-on Store
2. Press CTRL+SHIFT+R to refresh
3. Scroll down to "Local add-ons"
4. You should see **"WhatsApp Multi-Account"**

---

## If Using SSH Instead of Samba

```bash
# SSH into Home Assistant
ssh root@homeassistant.local

# Check if folder exists
ls -la /addons/

# If not, it should exist - if it doesn't, you might be on HA Container (not supported)
```

Copy files to `/addons/whatsapp/` via SCP or any file transfer method.

---

## The Add-on Should Now Appear

Once files are in the right place and HA is restarted:
- It WILL show up in Local add-ons
- You can install it
- It will build (takes a few minutes)
- It will start successfully

This is a minimal test version - once it shows up and installs, I'll add the WhatsApp functionality.

---

## Files Required (All Present in whatsapp folder)

- ✅ config.yaml
- ✅ Dockerfile
- ✅ build.yaml
- ✅ run.sh
- ✅ icon.png
- ✅ logo.png

All files are ready. Just copy the `whatsapp` folder to `\\homeassistant.local\addons\`
