# Installation Instructions

## Quick Install

### Step 1: Copy to Home Assistant

Copy the `whatsapp` folder to your Home Assistant:

**Option A - Using File Editor or Samba:**
1. Access your Home Assistant file system
2. Navigate to `/config/addons/`
3. If `addons` folder doesn't exist, create it
4. Copy the entire `whatsapp` folder into `/config/addons/`

**Option B - Using Terminal/SSH:**
```bash
# Access Home Assistant terminal/SSH
cd /config
mkdir -p addons
# Then copy the whatsapp folder here
```

### Step 2: Verify Structure

Make sure your folder structure looks like this:
```
/config/
└── addons/
    └── whatsapp/
        ├── config.yaml
        ├── Dockerfile
        ├── build.yaml
        ├── rootfs/
        └── translations/
```

### Step 3: Install from Add-on Store

1. In Home Assistant, go to **Settings** → **Add-ons**
2. Click **Add-on Store** (bottom right)
3. Press **CTRL+F5** (or CMD+F5 on Mac) to refresh
4. Scroll to find **Local add-ons** section
5. Click on **WhatsApp Multi-Account**
6. Click **INSTALL**

### Step 4: Configure the Add-on

After installation:
1. Go to the **Configuration** tab
2. Configure your first instance:
   - Enable Instance 1: **ON**
   - Instance 1 ID: `personal` (or any unique name)
   - Instance 1 Port: `3000`
   - Instance 1 Name: `Personal WhatsApp`

3. (Optional) Add more instances:
   - Enable Instance 2: **ON**
   - Instance 2 ID: `work`
   - Instance 2 Port: `3001`
   - Instance 2 Name: `Work WhatsApp`

4. Click **SAVE**

### Step 5: Start the Add-on

1. Go to the **Info** tab
2. Click **START**
3. Enable **Start on boot** if desired
4. Enable **Watchdog** for auto-restart

### Step 6: Connect WhatsApp Accounts

1. Click **OPEN WEB UI** (once the add-on starts)
2. You'll see your configured instances
3. For each disconnected instance:
   - Click **Show QR Code**
   - Open WhatsApp on your phone
   - Go to **Settings** → **Linked Devices**
   - Tap **Link a Device**
   - Scan the QR code

### Step 7: Install the Integration

For each WhatsApp account:
1. Go to **Settings** → **Devices & Services**
2. Click **+ ADD INTEGRATION**
3. Search for **WhatsApp Web Integration**
4. Configure:
   - **Instance ID**: Use the same ID from add-on (e.g., `personal`)
   - **Add-on URL**: `http://homeassistant.local:3000` (or your port)
   - **Country Code**: Your default (e.g., `1` for US)
5. Click **Submit**

Repeat for each WhatsApp account with different Instance IDs and ports.

## Troubleshooting

### Add-on doesn't appear in Local add-ons

**Solution:**
1. Check folder is in `/config/addons/whatsapp`
2. Verify `config.yaml` exists
3. Refresh the page (CTRL+F5)
4. Check Home Assistant logs
5. Try restarting Home Assistant

### Installation fails

**Check these:**
1. Sufficient disk space (need ~500MB)
2. Good internet connection (downloads dependencies)
3. Check Supervisor logs
4. Try rebuilding the add-on

### Can't access Web UI

**Solution:**
1. Wait for add-on to fully start (check logs)
2. Try `http://homeassistant.local:8099` directly
3. Check if port 8099 is accessible
4. Restart the add-on

### QR Code doesn't appear

**Solution:**
1. Make sure instance is "disconnected"
2. Refresh the web interface
3. Check add-on logs for errors
4. Try restarting the specific instance

## Example Configuration

Here's a sample configuration for 2 WhatsApp accounts:

```yaml
instance_1_enabled: true
instance_1_id: "personal"
instance_1_port: 3000
instance_1_name: "Personal WhatsApp"

instance_2_enabled: true
instance_2_id: "work"
instance_2_port: 3001
instance_2_name: "Work WhatsApp"

instance_3_enabled: false
instance_3_id: "business"
instance_3_port: 3002
instance_3_name: "Business WhatsApp"
```

## Using in Automations

After setup, use in automations like this:

```yaml
service: whatsapp_web_rest.send_person_text
data:
  instance_id: "personal"  # Which account to use
  phone_number: "1234567890"
  message: "Hello from Home Assistant!"
```

## Need Help?

- Check the [DOCS.md](./whatsapp/DOCS.md) for detailed documentation
- Review Home Assistant logs
- Check add-on logs
- Visit the [Community Forum](https://community.home-assistant.io)

---

**Ready to connect your WhatsApp accounts!**
