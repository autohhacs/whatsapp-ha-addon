# Installation Troubleshooting Guide

## Pre-Installation Checklist

Before installing, verify:

### 1. File Structure
```
whatsapp/
├── config.yaml          ✓ Must exist
├── Dockerfile           ✓ Must exist
├── build.yaml           ✓ Must exist
├── README.md
├── DOCS.md
├── icon.png             ✓ Must exist
├── logo.png             ✓ Must exist
├── rootfs/
│   ├── etc/
│   │   └── services.d/
│   │       └── whatsapp/
│   │           ├── run      ✓ Must be executable
│   │           └── finish   ✓ Must be executable
│   └── opt/
│       └── web-interface/
│           ├── server.js
│           ├── package.json
│           └── public/
└── translations/
    ├── en.yaml
    └── es.yaml
```

### 2. Validate config.yaml

Run this command to check for YAML syntax errors:
```bash
# If you have yq or python installed
python3 -c "import yaml; yaml.safe_load(open('config.yaml'))"
```

Common issues:
- Tabs instead of spaces (YAML requires spaces)
- Inconsistent indentation
- Missing colons
- Unquoted special characters

### 3. Check File Permissions

The run script must be executable:
```bash
chmod +x rootfs/etc/services.d/whatsapp/run
chmod +x rootfs/etc/services.d/whatsapp/finish
```

### 4. Verify Paths

Make sure you copied to the correct location:
- Correct: `/config/addons/whatsapp/`
- Wrong: `/config/whatsapp/`
- Wrong: `/addons/whatsapp/`

## Common Installation Errors

### Error: "Unknown error, see supervisor"

**Possible Causes:**
1. **Invalid config.yaml** - Most common
   - Solution: Validate YAML syntax
   - Check for tabs vs spaces
   - Verify all required fields exist

2. **Missing required files**
   - Solution: Verify all files listed above exist
   - Check that icon.png and logo.png are present

3. **Invalid Dockerfile**
   - Solution: Check Dockerfile syntax
   - Ensure it starts with `ARG BUILD_FROM` and `FROM $BUILD_FROM`

4. **Permission issues**
   - Solution: Run `chmod +x` on run/finish scripts
   - Check folder ownership

5. **Invalid schema in config.yaml**
   - Solution: Ensure schema types match:
     - `bool` for true/false
     - `str` for text
     - `port` for port numbers (or `int`)

### Error: "Add-on not appearing"

**Solution:**
1. Check folder location: `/config/addons/whatsapp/`
2. Refresh browser (CTRL+F5)
3. Check Home Assistant logs
4. Restart Home Assistant
5. Check supervisor logs

### Error: "Build failed"

**Solution:**
1. Check internet connection (downloads packages)
2. Verify sufficient disk space (need ~500MB)
3. Check Dockerfile syntax
4. Review build logs for specific errors
5. Try a different base image version

## Manual Validation Steps

### 1. Test YAML Syntax

Create a file `test_config.py`:
```python
import yaml
import sys

try:
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    print("✓ config.yaml is valid")
    print(f"  Name: {config.get('name')}")
    print(f"  Version: {config.get('version')}")
    print(f"  Slug: {config.get('slug')}")
except yaml.YAMLError as e:
    print(f"✗ YAML Error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)
```

Run: `python3 test_config.py`

### 2. Check Supervisor Logs

```bash
ha supervisor logs
```

Look for specific error messages about the add-on.

### 3. Verify Docker Build

If you have Docker access:
```bash
docker build -t test-whatsapp .
```

This will show exactly where the build fails.

## Known Working Configuration

If all else fails, use this minimal working config:

### config.yaml (minimal)
```yaml
name: WhatsApp Multi-Account
version: "3.0.0"
slug: whatsapp_multi
description: WhatsApp integration
url: https://github.com/autohhacs/whatsapp-ha-addon
arch:
  - amd64
init: false
startup: application
map:
  - share:rw
options:
  instance_1_enabled: true
  instance_1_id: personal
  instance_1_port: 3000
  instance_1_name: Personal
schema:
  instance_1_enabled: bool
  instance_1_id: str
  instance_1_port: port
  instance_1_name: str
ports:
  3000/tcp: 3000
homeassistant_api: true
```

## Getting Help

If none of these solutions work:

1. **Check Logs:**
   - Home Assistant logs: Settings → System → Logs
   - Supervisor logs: `ha supervisor logs`
   - Add-on logs (after install): Add-on → Log tab

2. **Provide Information:**
   - Home Assistant version
   - Installation method (OS, Container, Core)
   - Full error message
   - Relevant log entries

3. **Test with Minimal Config:**
   - Use only instance_1
   - Remove optional features
   - Try to identify what's causing the issue

## Quick Fix Commands

```bash
# Navigate to add-on folder
cd /config/addons/whatsapp

# Fix permissions
chmod +x rootfs/etc/services.d/whatsapp/run
chmod +x rootfs/etc/services.d/whatsapp/finish

# Validate YAML (if python available)
python3 -m yaml config.yaml

# Check file existence
ls -la config.yaml Dockerfile build.yaml icon.png logo.png

# Check folder structure
find . -type f
```

---

**Still having issues? Check the full DOCS.md for detailed installation instructions.**
