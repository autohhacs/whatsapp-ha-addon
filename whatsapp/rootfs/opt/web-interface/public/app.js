let currentQRInstance = null;
let autoRefreshInterval = null;

// Load instances on page load
document.addEventListener('DOMContentLoaded', () => {
    refreshInstances();
    // Auto-refresh every 10 seconds
    autoRefreshInterval = setInterval(refreshInstances, 10000);
});

async function refreshInstances() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('instances-container');
    const errorContainer = document.getElementById('error-container');

    loading.style.display = 'block';
    container.style.display = 'none';
    errorContainer.style.display = 'none';

    try {
        const response = await fetch('/api/instances');
        const data = await response.json();

        if (data.instances && data.instances.length > 0) {
            renderInstances(data.instances);
            container.style.display = 'grid';
        } else {
            showError('No instances configured. Please configure instances in the add-on configuration.');
        }
    } catch (error) {
        showError(`Failed to load instances: ${error.message}`);
    } finally {
        loading.style.display = 'none';
    }
}

function renderInstances(instances) {
    const container = document.getElementById('instances-container');
    container.innerHTML = '';

    instances.forEach(instance => {
        const card = createInstanceCard(instance);
        container.appendChild(card);
    });
}

function createInstanceCard(instance) {
    const card = document.createElement('div');
    card.className = `instance-card ${instance.connected ? 'connected' : 'disconnected'}`;

    const statusClass = instance.connected ? 'connected' :
                       instance.status === 'connecting' ? 'connecting' : 'disconnected';
    const statusText = instance.connected ? 'Connected' :
                      instance.status === 'connecting' ? 'Connecting' : 'Disconnected';

    card.innerHTML = `
        <div class="instance-header">
            <div class="instance-info">
                <h2>${escapeHtml(instance.name)}</h2>
                <div class="instance-id">ID: ${escapeHtml(instance.id)}</div>
            </div>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>

        <div class="instance-details">
            <div class="detail-row">
                <span class="detail-label">Port</span>
                <span class="detail-value">${instance.port}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status</span>
                <span class="detail-value">${escapeHtml(instance.status)}</span>
            </div>
            ${instance.error ? `
            <div class="detail-row">
                <span class="detail-label">Error</span>
                <span class="detail-value" style="color: var(--danger-color);">${escapeHtml(instance.error)}</span>
            </div>
            ` : ''}
        </div>

        <div class="instance-actions">
            ${!instance.connected ? `
                <button class="btn btn-primary" onclick="showQRCode('${instance.id}')">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" />
                    </svg>
                    Show QR Code
                </button>
            ` : `
                <button class="btn btn-primary" onclick="showStatusModal('${instance.id}', '${escapeHtml(instance.name)}')">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8C14.21,8 16,9.79 16,12C16,14.21 14.21,16 12,16C9.79,16 8,14.21 8,12C8,9.79 9.79,8 12,8Z" />
                    </svg>
                    Post Status
                </button>
                <button class="btn btn-primary" onclick="showMediaModal('${instance.id}', '${escapeHtml(instance.name)}')">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,10V15L15,12.5M17,7H7A2,2 0 0,0 5,9V15A2,2 0 0,0 7,17H17A2,2 0 0,0 19,15V9A2,2 0 0,0 17,7Z" />
                    </svg>
                    Send Media
                </button>
                <button class="btn btn-secondary" onclick="restartInstance('${instance.id}')">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z" />
                    </svg>
                    Restart
                </button>
                <button class="btn btn-danger" onclick="logoutInstance('${instance.id}')">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />
                    </svg>
                    Logout
                </button>
            `}
        </div>
    `;

    return card;
}

async function showQRCode(instanceId) {
    currentQRInstance = instanceId;
    const modal = document.getElementById('qr-modal');
    const qrContainer = document.getElementById('qr-code-container');

    modal.classList.add('show');
    qrContainer.innerHTML = '<div class="spinner"></div>';

    try {
        const response = await fetch(`/api/instance/${instanceId}/qr`);
        const data = await response.json();

        if (data.qr) {
            qrContainer.innerHTML = `<img src="${data.qr}" alt="QR Code" />`;
        } else if (data.error) {
            qrContainer.innerHTML = `<p style="color: var(--danger-color);">Error: ${escapeHtml(data.error)}</p>`;
        } else {
            qrContainer.innerHTML = '<p style="color: var(--text-secondary);">QR code not available. The instance may already be connected.</p>';
        }
    } catch (error) {
        qrContainer.innerHTML = `<p style="color: var(--danger-color);">Failed to load QR code: ${escapeHtml(error.message)}</p>`;
    }
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    modal.classList.remove('show');
    currentQRInstance = null;
}

async function logoutInstance(instanceId) {
    if (!confirm('Are you sure you want to logout this WhatsApp instance?')) {
        return;
    }

    try {
        const response = await fetch(`/api/instance/${instanceId}/logout`, {
            method: 'POST'
        });
        const data = await response.json();

        if (data.success) {
            alert('Logged out successfully!');
            refreshInstances();
        } else {
            alert(`Failed to logout: ${data.error || 'Unknown error'}`);
        }
    } catch (error) {
        alert(`Failed to logout: ${error.message}`);
    }
}

async function restartInstance(instanceId) {
    if (!confirm('Are you sure you want to restart this WhatsApp instance?')) {
        return;
    }

    try {
        const response = await fetch(`/api/instance/${instanceId}/restart`, {
            method: 'POST'
        });
        const data = await response.json();

        if (data.success) {
            alert('Instance restarted successfully!');
            setTimeout(refreshInstances, 2000);
        } else {
            alert(`Failed to restart: ${data.error || 'Unknown error'}`);
        }
    } catch (error) {
        alert(`Failed to restart: ${error.message}`);
    }
}

function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show Status Modal
function showStatusModal(instanceId, instanceName) {
    const modal = document.getElementById('status-modal');
    document.getElementById('status-instance-name').textContent = instanceName;
    document.getElementById('status-instance-id').value = instanceId;
    document.getElementById('status-text').value = '';
    modal.classList.add('show');
}

function closeStatusModal() {
    const modal = document.getElementById('status-modal');
    modal.classList.remove('show');
}

async function postStatus() {
    const instanceId = document.getElementById('status-instance-id').value;
    const statusText = document.getElementById('status-text').value;
    const statusBtn = document.querySelector('#status-modal .btn-primary');

    if (!statusText.trim()) {
        alert('Please enter status text');
        return;
    }

    statusBtn.disabled = true;
    statusBtn.textContent = 'Posting...';

    try {
        const response = await fetch(`/api/instance/${instanceId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: statusText })
        });
        const data = await response.json();

        if (data.success || response.ok) {
            alert('Status posted successfully!');
            closeStatusModal();
        } else {
            alert(`Failed to post status: ${data.error || 'Unknown error'}`);
        }
    } catch (error) {
        alert(`Failed to post status: ${error.message}`);
    } finally {
        statusBtn.disabled = false;
        statusBtn.textContent = 'Post Status';
    }
}

// Show Media Modal
function showMediaModal(instanceId, instanceName) {
    const modal = document.getElementById('media-modal');
    document.getElementById('media-instance-name').textContent = instanceName;
    document.getElementById('media-instance-id').value = instanceId;
    document.getElementById('media-phone').value = '';
    document.getElementById('media-url').value = '';
    document.getElementById('media-caption').value = '';
    document.getElementById('media-filename').value = '';
    modal.classList.add('show');
}

function closeMediaModal() {
    const modal = document.getElementById('media-modal');
    modal.classList.remove('show');
}

async function sendMedia() {
    const instanceId = document.getElementById('media-instance-id').value;
    const phoneNumber = document.getElementById('media-phone').value;
    const mediaUrl = document.getElementById('media-url').value;
    const caption = document.getElementById('media-caption').value;
    const filename = document.getElementById('media-filename').value;
    const mediaBtn = document.querySelector('#media-modal .btn-primary');

    if (!phoneNumber.trim()) {
        alert('Please enter a phone number');
        return;
    }

    if (!mediaUrl.trim()) {
        alert('Please enter a media URL');
        return;
    }

    mediaBtn.disabled = true;
    mediaBtn.textContent = 'Sending...';

    try {
        const response = await fetch(`/api/instance/${instanceId}/send-media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: phoneNumber,
                mediaUrl: mediaUrl,
                caption: caption,
                filename: filename || undefined,
                sendAsDocument: true
            })
        });
        const data = await response.json();

        if (data.success || response.ok) {
            alert('Media sent successfully!');
            closeMediaModal();
        } else {
            alert(`Failed to send media: ${data.error || 'Unknown error'}`);
        }
    } catch (error) {
        alert(`Failed to send media: ${error.message}`);
    } finally {
        mediaBtn.disabled = false;
        mediaBtn.textContent = 'Send Media';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const qrModal = document.getElementById('qr-modal');
    const statusModal = document.getElementById('status-modal');
    const mediaModal = document.getElementById('media-modal');

    if (event.target === qrModal) {
        closeQRModal();
    } else if (event.target === statusModal) {
        closeStatusModal();
    } else if (event.target === mediaModal) {
        closeMediaModal();
    }
}
