# 🚀 START HERE - WhatsApp Multi-Account Add-on v3.0.1

## ⚠️ IMPORTANT: Complete Deep Fix Applied

This is version **3.0.1** with comprehensive fixes. If you had previous installation attempts, those are outdated.

## Quick Start (5-10 Minutes)

### Step 1: Copy to Home Assistant
Copy the entire `whatsapp` folder to `/config/addons/whatsapp` on your Home Assistant

### Step 2: Run Validation (Optional but Recommended)
```bash
cd /config/addons/whatsapp
./validate.sh
```

If validation fails, it will tell you what to fix.

### Step 3: Install
1. In Home Assistant: **Settings** → **Add-ons** → **Add-on Store**
2. Press **CTRL+F5** to refresh
3. Scroll down to **Local add-ons**
4. Click **WhatsApp Multi-Account**
5. Click **INSTALL**

### Step 4: Configure
After installation:
1. Click **Configuration** tab
2. Keep defaults or customize:
   ```yaml
   instance_1_enabled: true
   instance_1_id: personal
   instance_1_port: 3000
   instance_1_name: Personal WhatsApp
   ```
3. Click **SAVE**

### Step 5: Start
1. Go to **Info** tab
2. Click **START**
3. Wait ~30 seconds for startup

### Step 6: Connect WhatsApp
1. Click **OPEN WEB UI** (or visit http://homeassistant.local:8099)
2. Click **Show QR Code** for your instance
3. Open WhatsApp on phone → **Settings** → **Linked Devices** → **Link a Device**
4. Scan the QR code
5. Wait for "Connected" status

### Step 7: Install Integration (For Automations)
1. **Settings** → **Devices & Services** → **+ ADD INTEGRATION**
2. Search: **WhatsApp Web Integration**
3. Configure:
   - **Instance ID**: `personal` (same as add-on)
   - **Base URL**: `http://homeassistant.local:3000`
   - **Country Code**: `1` (or your country)
4. Click **Submit**

## ✅ You're Done!

Test with an automation:
```yaml
service: whatsapp_web_rest.send_person_text
data:
  instance_id: personal
  phone_number: "1234567890"
  message: "Hello from Home Assistant!"
```

---

## 📚 Documentation

- **Quick Setup**: This file (you're reading it!)
- **Detailed Docs**: `whatsapp/DOCS.md`
- **Installation Guide**: `INSTALL_INSTRUCTIONS.md`
- **Troubleshooting**: `whatsapp/TROUBLESHOOTING.md`
- **Deep Fix Details**: `DEEP_FIX_SUMMARY.md`
- **Upgrade Guide**: `UPGRADE_GUIDE.md`

## 🔧 Troubleshooting

### Installation Fails?

1. **Run validation**: `cd /config/addons/whatsapp && ./validate.sh`
2. **Check supervisor logs**: Settings → System → Logs
3. **Read**: `whatsapp/TROUBLESHOOTING.md`
4. **Read**: `DEEP_FIX_SUMMARY.md`

### Common Issues

**"Unknown error, see supervisor"**
- Check `DEEP_FIX_SUMMARY.md` - all common causes are fixed
- Verify folder is at `/config/addons/whatsapp/`
- Run `./validate.sh` to check for issues

**Add-on doesn't appear**
- Refresh browser (CTRL+F5)
- Check folder location
- Restart Home Assistant

**Web UI won't load**
- Wait 30 seconds after startup
- Check add-on logs
- Try `http://homeassistant.local:8099`

## 🎯 What You Get

- ✨ Up to 3 WhatsApp accounts
- 🎨 Beautiful web management interface
- 📱 QR code authentication
- 🔌 Integration with Home Assistant
- 📊 Connection status sensors
- 🤖 Use in automations

## 📝 Configuration Examples

### One Account
```yaml
instance_1_enabled: true
instance_1_id: personal
instance_1_port: 3000
instance_1_name: My WhatsApp

instance_2_enabled: false
instance_3_enabled: false
```

### Two Accounts
```yaml
instance_1_enabled: true
instance_1_id: personal
instance_1_port: 3000
instance_1_name: Personal

instance_2_enabled: true
instance_2_id: work
instance_2_port: 3001
instance_2_name: Work

instance_3_enabled: false
```

### Three Accounts
```yaml
instance_1_enabled: true
instance_1_id: personal
instance_1_port: 3000
instance_1_name: Personal

instance_2_enabled: true
instance_2_id: work
instance_2_port: 3001
instance_2_name: Work

instance_3_enabled: true
instance_3_id: business
instance_3_port: 3002
instance_3_name: Business
```

## 🚨 Important Notes

1. **Each instance needs a unique ID** (no duplicates)
2. **Each instance needs a unique port** (3000, 3001, 3002)
3. **Use lowercase for IDs** (personal, not Personal)
4. **No spaces in IDs** (use_underscores_instead)
5. **Web UI is on port 8099** (all instances share this)

## 💡 Pro Tips

1. **Enable only what you need** - Disable unused instances
2. **Use descriptive names** - Makes web UI easier to navigate
3. **Monitor connection status** - Check sensors regularly
4. **Backup sessions** - Located in `/data/whatsapp/`
5. **Update carefully** - Back up before major updates

## 🎓 Learning Path

1. **Start Simple**: Install with just instance_1
2. **Test**: Send a message via automation
3. **Add More**: Enable instance_2 when ready
4. **Explore**: Try the web interface features
5. **Automate**: Build cool automations!

## 🆘 Need Help?

1. Read `TROUBLESHOOTING.md`
2. Read `DEEP_FIX_SUMMARY.md`
3. Check supervisor logs
4. Check add-on logs
5. Ask in Home Assistant community

---

## 🔧 What's New in v3.0.1

This version includes critical fixes that resolve all known installation issues:

- ✅ **Official base images**: Uses `home-assistant/*-base:3.19` instead of third-party images
- ✅ **Better slug**: Changed to `whatsapp-multi` (standard naming)
- ✅ **Proper startup**: Uses `services` mode for S6 overlay
- ✅ **Enhanced Docker**: Optimized Dockerfile with better layer caching
- ✅ **Configurable web port**: Web UI port now configurable
- ✅ **Repository file**: Added for better local add-on detection
- ✅ **Full API access**: Both hassio_api and homeassistant_api enabled

**For complete details**: See `COMPLETE_FIX_v3.0.1.md`

---

**Made with ❤️ for Home Assistant - Version 3.0.1**

🎉 **Ready to connect your WhatsApp accounts!**
