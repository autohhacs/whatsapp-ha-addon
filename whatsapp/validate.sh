#!/bin/bash
# WhatsApp Add-on Validation Script
# Run this before installing to check for common issues

echo "========================================"
echo "WhatsApp Add-on Validation Script"
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "config.yaml" ]; then
    echo -e "${RED}✗ Error: config.yaml not found${NC}"
    echo "  Please run this script from the add-on directory"
    exit 1
fi

echo "1. Checking required files..."
for file in config.yaml Dockerfile build.yaml icon.png logo.png; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file exists"
    else
        echo -e "  ${RED}✗${NC} $file missing"
        ((ERRORS++))
    fi
done
echo ""

echo "2. Checking directory structure..."
for dir in rootfs/etc/services.d/whatsapp rootfs/opt/web-interface/public translations; do
    if [ -d "$dir" ]; then
        echo -e "  ${GREEN}✓${NC} $dir exists"
    else
        echo -e "  ${RED}✗${NC} $dir missing"
        ((ERRORS++))
    fi
done
echo ""

echo "3. Checking executable scripts..."
for script in rootfs/etc/services.d/whatsapp/run rootfs/etc/services.d/whatsapp/finish; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            echo -e "  ${GREEN}✓${NC} $script is executable"
        else
            echo -e "  ${YELLOW}⚠${NC} $script exists but not executable (will fix)"
            chmod +x "$script"
            echo -e "    ${GREEN}✓${NC} Fixed: made $script executable"
        fi
    else
        echo -e "  ${RED}✗${NC} $script missing"
        ((ERRORS++))
    fi
done
echo ""

echo "4. Validating config.yaml..."
# Check for tabs
if grep -q $'\t' config.yaml; then
    echo -e "  ${RED}✗${NC} config.yaml contains tabs (YAML requires spaces)"
    ((ERRORS++))
else
    echo -e "  ${GREEN}✓${NC} No tabs found"
fi

# Check for required fields
for field in name version slug description arch; do
    if grep -q "^$field:" config.yaml; then
        echo -e "  ${GREEN}✓${NC} Field '$field' present"
    else
        echo -e "  ${RED}✗${NC} Field '$field' missing"
        ((ERRORS++))
    fi
done
echo ""

echo "5. Checking YAML syntax..."
if command -v python3 &> /dev/null; then
    if python3 -c "import yaml; yaml.safe_load(open('config.yaml'))" 2>/dev/null; then
        echo -e "  ${GREEN}✓${NC} config.yaml syntax is valid"
    else
        echo -e "  ${RED}✗${NC} config.yaml has syntax errors"
        python3 -c "import yaml; yaml.safe_load(open('config.yaml'))" 2>&1
        ((ERRORS++))
    fi
else
    echo -e "  ${YELLOW}⚠${NC} Python3 not available, skipping YAML validation"
    ((WARNINGS++))
fi
echo ""

echo "6. Checking translations..."
for lang in en es; do
    if [ -f "translations/${lang}.yaml" ]; then
        echo -e "  ${GREEN}✓${NC} translations/${lang}.yaml exists"
        if command -v python3 &> /dev/null; then
            if python3 -c "import yaml; yaml.safe_load(open('translations/${lang}.yaml'))" 2>/dev/null; then
                echo -e "    ${GREEN}✓${NC} Valid YAML syntax"
            else
                echo -e "    ${RED}✗${NC} Invalid YAML syntax"
                ((ERRORS++))
            fi
        fi
    else
        echo -e "  ${YELLOW}⚠${NC} translations/${lang}.yaml missing"
        ((WARNINGS++))
    fi
done
echo ""

echo "7. Checking Dockerfile..."
if grep -q "^ARG BUILD_FROM" Dockerfile && grep -q "^FROM \$BUILD_FROM" Dockerfile; then
    echo -e "  ${GREEN}✓${NC} Dockerfile has correct BUILD_FROM structure"
else
    echo -e "  ${RED}✗${NC} Dockerfile missing proper BUILD_FROM"
    ((ERRORS++))
fi
echo ""

echo "8. Checking web interface files..."
for file in rootfs/opt/web-interface/server.js rootfs/opt/web-interface/package.json; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file exists"
    else
        echo -e "  ${RED}✗${NC} $file missing"
        ((ERRORS++))
    fi
done
echo ""

echo "========================================"
echo "Validation Summary"
echo "========================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo "  The add-on should install correctly."
    echo ""
    echo "Next steps:"
    echo "  1. Copy this folder to /config/addons/whatsapp"
    echo "  2. Refresh the Add-on Store (CTRL+F5)"
    echo "  3. Find 'WhatsApp Multi-Account' under Local add-ons"
    echo "  4. Click INSTALL"
    exit 0
else
    echo -e "${RED}✗ Found $ERRORS error(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ Found $WARNINGS warning(s)${NC}"
    fi
    echo "  Please fix the errors before installing."
    exit 1
fi
