ARG BUILD_FROM
FROM $BUILD_FROM

# Install Node.js and npm
RUN apk add --no-cache \
    nodejs \
    npm \
    bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer to skip downloading Chromium (we installed it via apk)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy rootfs
COPY rootfs /

# Install web interface dependencies
WORKDIR /opt/web-interface
RUN npm install --production && npm cache clean --force

# Create necessary directories
RUN mkdir -p /data/whatsapp /share/whatsapp

# Expose ports
EXPOSE 3000 3001 3002 8099

# S6 overlay will run services from /etc/services.d/
