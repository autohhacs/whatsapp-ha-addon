# Local Installation Guide

## Install WhatsApp Multi-Account Add-on Locally

### Method 1: Using File System (Recommended)

1. **Copy the add-on folder**
   - Copy the entire `whatsapp` folder to your Home Assistant
   - Place it in: `/config/addons/whatsapp`
   - Full path should be: `/config/addons/whatsapp/config.yaml`

2. **Access via SSH/Terminal**
   ```bash
   # If using SSH add-on or terminal:
   cd /config
   mkdir -p addons
   cd addons
   # Then copy the whatsapp folder here
   ```

3. **Refresh Add-on Store**
   - In Home Assistant, go to **Settings** → **Add-ons**
   - Click **Add-on Store** tab
   - Refresh the page (CTRL+F5 or CMD+F5)
   - Look under "Local add-ons"

4. **Install**
   - Click on "WhatsApp Multi-Account"
   - Click **INSTALL**

### Method 2: Using Samba/File Share

1. Enable the **Samba** add-on in Home Assistant
2. Connect to your Home Assistant share from your computer
3. Navigate to the `addons` folder (create if it doesn't exist)
4. Copy the `whatsapp` folder into `addons`
5. Refresh the Add-on Store in Home Assistant

### Method 3: Using SSH/SCP

```bash
# From your computer, copy to Home Assistant
scp -r whatsapp root@<homeassistant-ip>:/config/addons/
```

## Directory Structure

After copying, your structure should look like:

```
/config/
└── addons/
    └── whatsapp/
        ├── config.yaml
        ├── Dockerfile
        ├── DOCS.md
        ├── README.md
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
            └── en.yaml
```

## Verification

1. **Check Add-on Store**
   - Go to Settings → Add-ons → Add-on Store
   - You should see "WhatsApp Multi-Account" under "Local add-ons"

2. **If Not Visible**
   - Check the folder structure matches above
   - Refresh the page (CTRL+F5)
   - Check Home Assistant logs for errors
   - Restart Home Assistant if needed

## Configuration

After installation, configure your instances:

```yaml
instances:
  - id: "personal"
    port: 3000
    name: "Personal WhatsApp"
  - id: "work"
    port: 3001
    name: "Work WhatsApp"
```

Then start the add-on and open the web interface!

## Troubleshooting

### Add-on Not Appearing

1. Check folder permissions:
   ```bash
   chmod -R 755 /config/addons/whatsapp
   ```

2. Verify config.yaml is valid:
   ```bash
   cat /config/addons/whatsapp/config.yaml
   ```

3. Check Home Assistant logs:
   - Settings → System → Logs

### Installation Fails

1. Check available disk space
2. Review build logs in add-on installation screen
3. Ensure Docker is running properly
4. Try rebuilding:
   - Click on the add-on
   - Click "Rebuild"

## Updates

To update the local add-on:

1. Replace the files in `/config/addons/whatsapp`
2. Go to the add-on page
3. Click **Rebuild** if needed
4. Restart the add-on

## Support

For issues:
- Check the [DOCS.md](./whatsapp/DOCS.md)
- Open an issue on GitHub
- Visit the Home Assistant Community Forum

---

**Made with ❤️ for Home Assistant**
