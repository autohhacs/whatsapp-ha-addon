# WhatsApp Multi-Account Add-on - Installation Guide

## Fixed Issues

The following issues have been fixed to make the add-on appear in the Home Assistant add-on store:

1. ✅ **config.yaml** - Added all required fields (ports, ingress, options, schema)
2. ✅ **Dockerfile** - Added Node.js, npm, and web interface dependencies
3. ✅ **Repository Structure** - Removed duplicate repository.yaml file
4. ✅ **Service Scripts** - Made executable and added error handling

## Installation Steps

### Option 1: Local Installation (Recommended)

1. **Copy the add-on to Home Assistant**

   Copy the entire `whatsapp` folder to your Home Assistant's `/config/addons/` directory:
   ```
   /config/addons/whatsapp/
   ```

2. **Restart Home Assistant** (optional but recommended)

   Go to **Settings** → **System** → **Restart**

3. **Refresh the Add-on Store**

   - Go to **Settings** → **Add-ons** → **Add-on Store**
   - Press `CTRL + F5` (or `CMD + R` on Mac) to force refresh
   - Look under **"Local add-ons"** section
   - You should see **"WhatsApp Multi-Account"**

4. **Install the Add-on**

   - Click on **"WhatsApp Multi-Account"**
   - Click **"INSTALL"**
   - Wait for installation to complete

5. **Configure the Add-on**

   In the **Configuration** tab:
   ```yaml
   web_port: 8099
   instance_1_enabled: true
   instance_1_id: "personal"
   instance_1_port: 3000
   instance_1_name: "Personal WhatsApp"
   instance_2_enabled: false
   instance_2_id: "work"
   instance_2_port: 3001
   instance_2_name: "Work WhatsApp"
   instance_3_enabled: false
   instance_3_id: "business"
   instance_3_port: 3002
   instance_3_name: "Business WhatsApp"
   ```

6. **Start the Add-on**

   - Switch to the **"Info"** tab
   - Click **"START"**
   - Monitor the logs for any errors

### Option 2: Repository Installation

1. **Create a local repository**

   Copy the entire parent folder (containing `repository.yaml` and `whatsapp` folder) to:
   ```
   /config/addons/whatsapp-repo/
   ```

2. **Add the repository to Home Assistant**

   - Go to **Settings** → **Add-ons** → **Add-on Store**
   - Click the **three dots** menu (⋮) in the top right
   - Select **"Repositories"**
   - Add the repository URL (if using Git) or leave it for local access

3. **Refresh and install** following steps 3-6 from Option 1

## Troubleshooting

### Add-on doesn't appear in the store

1. Verify the folder structure:
   ```
   /config/addons/whatsapp/
   ├── config.yaml
   ├── Dockerfile
   ├── build.yaml
   ├── icon.png
   ├── logo.png
   ├── DOCS.md
   └── rootfs/
   ```

2. Check file permissions - all files should be readable

3. Force refresh the browser: `CTRL + F5`

4. Restart Home Assistant

5. Check Home Assistant logs:
   ```
   Settings → System → Logs → Supervisor
   ```

### Add-on won't start

1. Check the add-on logs for errors

2. Verify Node.js and npm are installed correctly (should happen during build)

3. Ensure ports 3000-3002 and 8099 are not used by other services

### Missing WhatsApp REST API Warning

The add-on currently shows a warning about missing WhatsApp REST API at `/app`. This is expected and will be addressed by:

1. Installing whatsapp-web.js library
2. Or using a compatible WhatsApp Web API implementation

The web interface will still work but WhatsApp instances won't connect until the REST API is added.

## Next Steps

After installation:

1. Access the web interface via the **"OPEN WEB UI"** button
2. Configure your WhatsApp instances
3. Install the companion Home Assistant integration (if available)

## File Locations

- **Add-on config**: `/config/addons/whatsapp/config.yaml`
- **Add-on data**: `/data/whatsapp/`
- **Shared data**: `/share/whatsapp/`

## Support

For issues or questions:
- Check the DOCS.md file in the add-on directory
- Review the TROUBLESHOOTING.md file
- Visit the GitHub repository: https://github.com/autohhacs/whatsapp-ha-addon

---

**Fixed and updated**: October 2024
