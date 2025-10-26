# WhatsApp Multi-Account Add-on

## Overview

Connect multiple WhatsApp accounts to Home Assistant. Each account runs as a separate instance with its own unique ID for easy management of personal, work, and business accounts.

## Features

- **Multiple WhatsApp Accounts**: Up to 5 accounts simultaneously
- **Unique Instance IDs**: Each account identified by custom ID
- **Web Interface**: Beautiful dashboard for managing all accounts
- **QR Code Authentication**: Easy setup and reconnection
- **Real-time Status**: Monitor connection status for each account
- **REST API**: Full API access per instance
- **Ingress Support**: Secure access through Home Assistant

## Installation

### Local Installation

1. Copy this folder to `/config/addons/whatsapp` on your Home Assistant
2. Go to **Settings** → **Add-ons** → **Add-on Store**
3. Refresh (CTRL+F5)
4. Find under "Local add-ons" and install

## Configuration

Configure instances in the add-on configuration:

```yaml
instances:
  - id: "personal"
    port: 3000
    name: "Personal WhatsApp"
  - id: "work"
    port: 3001
    name: "Work WhatsApp"
  - id: "business"
    port: 3002
    name: "Business WhatsApp"
```

### Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `id` | Unique identifier (lowercase, no spaces) | Yes | "personal" |
| `port` | API port (3000-3100) | Yes | 3000 |
| `name` | Friendly display name | Yes | "Personal WhatsApp" |

**Important**: Each instance needs a unique ID and port.

## Setup Guide

### 1. Configure Add-on

1. Add instances to configuration
2. Save and start the add-on

### 2. Connect Accounts

1. Click **"OPEN WEB UI"**
2. For each instance, click **"Show QR Code"**
3. Open WhatsApp on your phone → **Settings** → **Linked Devices** → **Link a Device**
4. Scan the QR code

### 3. Install Integration

1. **Settings** → **Devices & Services** → **Add Integration**
2. Search for "WhatsApp Web Integration"
3. Configure:
   - **Instance ID**: Same as add-on (e.g., "personal")
   - **Add-on URL**: `http://homeassistant.local:3000` (use your instance's port)
   - **Country Code**: Default country code (e.g., 1)
4. Repeat for each account

## Usage in Automations

### Send Message from Specific Account

```yaml
service: whatsapp_web_rest.send_person_text
data:
  instance_id: "personal"  # Specify which account
  phone_number: "1234567890"
  message: "Hello!"
```

### Send to Group

```yaml
service: whatsapp_web_rest.send_group_text
data:
  instance_id: "work"
  group_id: "120363212425338382"
  message: "Meeting at 3 PM"
```

### Send Media

```yaml
service: whatsapp_web_rest.send_person_media
data:
  instance_id: "business"
  phone_number: "9876543210"
  url: "https://example.com/image.jpg"
```

## Port Reference

- Port 3000: Instance 1
- Port 3001: Instance 2
- Port 3002: Instance 3
- Port 3003: Instance 4
- Port 3004: Instance 5

## Available Sensors

Each instance creates:

**Binary Sensors**:
- Connection Status
- Incoming/Outgoing Messages
- Group/Private Messages
- Attachments, Voice Notes, Calls, etc.

**Sensors**:
- Last Incoming/Outgoing Message
- Last Chat ID
- Last Sender Name
- Last Event

All grouped under device "WhatsApp (instance_id)"

## Troubleshooting

### Won't Connect
1. Check add-on is running
2. Verify port matches in add-on and integration
3. Try logout and re-scan QR
4. Check add-on logs

### QR Code Not Showing
1. Instance must be disconnected
2. Restart add-on
3. Update WhatsApp on phone
4. Check network connectivity

### Integration Can't Find Instance
1. Verify Instance ID matches exactly
2. Check URL format: `http://homeassistant.local:PORT`
3. Test API: `http://homeassistant.local:PORT/api/status`

## API Endpoints

Each instance exposes:
- `GET /api/status` - Connection status
- `GET /api/qr` - QR code
- `POST /api/chats/{chatId}/messages` - Send message
- `POST /api/logout` - Logout
- `POST /api/restart` - Restart

Base: `http://homeassistant.local:PORT`

## Best Practices

1. Use descriptive IDs ("personal", "work", "business")
2. Monitor connection status sensors
3. Separate automations by instance
4. Regular backups of `/data/whatsapp/`
5. Keep add-on updated

## Version 3.0.0 Changes

- ✨ Multi-account support
- 🎨 New web interface
- 📱 Ingress support
- 🔌 Instance-aware services
- 📊 Connection sensors
- 🏠 Local installation

## Support

- **Issues**: [GitHub Issues](https://github.com/autohhacs/whatsapp-ha-addon/issues)
- **Community**: [Home Assistant Forum](https://community.home-assistant.io)

---

**Made with ❤️ for Home Assistant**
