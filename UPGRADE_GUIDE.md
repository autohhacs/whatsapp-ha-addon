# Upgrade Guide: Version 3.0.0

## What's New

Version 3.0.0 is a major upgrade that adds multi-account support and a beautiful web interface to manage all your WhatsApp accounts.

## Major Changes

### 1. Multi-Account Support
- Connect up to 5 WhatsApp accounts simultaneously
- Each account has a unique Instance ID
- Separate sessions and data for each account

### 2. New Configuration Format

**Old Format (v2.x)**:
```yaml
webserver_port: 3000
```

**New Format (v3.0)**:
```yaml
instances:
  - id: "personal"
    port: 3000
    name: "Personal WhatsApp"
  - id: "work"
    port: 3001
    name: "Work WhatsApp"
```

### 3. Web Interface
- Beautiful dashboard accessible via Ingress
- QR code scanning
- Instance management (restart, logout)
- Real-time connection status

### 4. Instance-Aware Services
Services now accept an `instance_id` parameter:

**Old Way**:
```yaml
service: rest_command.whatsapp_send_text_message
data:
  chat_id: "1234567890@c.us"
  message: "Hello"
```

**New Way** (using integration):
```yaml
service: whatsapp_web_rest.send_person_text
data:
  instance_id: "personal"  # Specify which account
  phone_number: "1234567890"
  message: "Hello"
```

## Migration Steps

### If You're Using the Old Version

1. **Backup Your Session**
   - Your WhatsApp session is in `/share/` or `/data/`
   - Back it up before upgrading

2. **Update Configuration**
   ```yaml
   instances:
     - id: "default"  # Use "default" for your existing account
       port: 3000
       name: "WhatsApp"
   ```

3. **Install New Integration**
   - Go to Settings → Devices & Services
   - Add "WhatsApp Web Integration"
   - Use Instance ID: "default"
   - URL: `http://homeassistant.local:3000`

4. **Update Automations**
   - Add `instance_id: "default"` to all service calls
   - Or leave it blank for backward compatibility

### Fresh Installation

1. Configure instances in add-on
2. Start add-on
3. Open Web UI and scan QR codes
4. Install WhatsApp Web Integration for each account
5. Use in automations with `instance_id`

## New Features

### Connection Monitoring
Each instance now has a connection status sensor:
- `binary_sensor.whatsapp_personal_connection_status`
- `binary_sensor.whatsapp_work_connection_status`

### Enhanced Sensors
All sensors are now grouped by device:
- Device: "WhatsApp (personal)"
- Device: "WhatsApp (work)"
- etc.

### Port Management
Ports 3000-3004 are pre-configured:
- Port 3000: First instance
- Port 3001: Second instance
- Port 3002: Third instance
- Port 3003: Fourth instance
- Port 3004: Fifth instance

## Breaking Changes

### Configuration File
The old `webserver_port` option is replaced by `instances` array.

### REST Commands
If you were using `rest_command`, you'll need to:
1. Install the WhatsApp Web Integration
2. Use the integration's services instead
3. Add `instance_id` to specify which account

### Session Storage
Sessions are now stored in `/data/whatsapp/{instance_id}/` instead of a single location.

## Backward Compatibility

The add-on maintains backward compatibility:
- If you don't specify `instance_id`, services use the first instance
- Old port 3000 still works
- Existing automations continue working (but should be updated)

## Troubleshooting

### "Instance not found" Error
- Verify the Instance ID matches your configuration
- Instance IDs are case-sensitive
- Check spelling

### Lost Session After Upgrade
- Check if session files exist in `/data/whatsapp/`
- You may need to re-scan QR code
- Restore from backup if needed

### Services Not Working
- Make sure you installed the WhatsApp Web Integration
- Add `instance_id` to service calls
- Verify the instance is connected (check Web UI)

### Web Interface Not Loading
- Ensure ingress is enabled in config
- Check add-on logs
- Restart the add-on

## Support

For help with the upgrade:
- Read [DOCS.md](./whatsapp/DOCS.md)
- Check [GitHub Issues](https://github.com/autohhacs/whatsapp-ha-addon/issues)
- Visit [Home Assistant Community](https://community.home-assistant.io)

---

**Welcome to WhatsApp Multi-Account v3.0.0!**
