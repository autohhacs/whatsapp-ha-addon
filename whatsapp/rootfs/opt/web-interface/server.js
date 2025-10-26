const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.INGRESS_PORT || 8099;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Read config and convert to instances array
function getConfig() {
    try {
        const configData = fs.readFileSync('/data/options.json', 'utf8');
        const config = JSON.parse(configData);

        // Convert flat config to instances array (supports up to 5 instances)
        const instances = [];
        for (let i = 1; i <= 5; i++) {
            if (config[`instance_${i}_enabled`]) {
                instances.push({
                    id: config[`instance_${i}_id`],
                    port: config[`instance_${i}_port`],
                    name: config[`instance_${i}_name`]
                });
            }
        }

        return { instances };
    } catch (error) {
        console.error('Error reading config:', error);
        return { instances: [] };
    }
}

// Get instance status
async function getInstanceStatus(instance) {
    try {
        const response = await axios.get(`http://localhost:${instance.port}/api/status`, {
            timeout: 5000
        });
        return {
            id: instance.id,
            name: instance.name,
            port: instance.port,
            connected: response.data.connected || response.data.authenticated || false,
            status: response.data.state || response.data.status || 'unknown',
            qr: response.data.qr || null,
            info: response.data
        };
    } catch (error) {
        return {
            id: instance.id,
            name: instance.name,
            port: instance.port,
            connected: false,
            status: 'disconnected',
            error: error.message
        };
    }
}

// API Routes
app.get('/api/instances', async (req, res) => {
    const config = getConfig();
    const statusPromises = config.instances.map(instance => getInstanceStatus(instance));
    const statuses = await Promise.all(statusPromises);
    res.json({ instances: statuses });
});

app.get('/api/instance/:id/qr', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    try {
        const response = await axios.get(`http://localhost:${instance.port}/api/qr`, {
            timeout: 5000
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/instance/:id/logout', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    try {
        const response = await axios.post(`http://localhost:${instance.port}/api/logout`, {});
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/instance/:id/restart', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    try {
        const response = await axios.post(`http://localhost:${instance.port}/api/restart`, {});
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post WhatsApp Status
app.post('/api/instance/:id/status', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    try {
        const response = await axios.post(`http://localhost:${instance.port}/api/status`, req.body, {
            timeout: 30000
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message, details: error.response?.data });
    }
});

// Send message with media file
app.post('/api/instance/:id/send-media', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    try {
        const response = await axios.post(`http://localhost:${instance.port}/api/send-media`, req.body, {
            timeout: 60000,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message, details: error.response?.data });
    }
});

// Generic proxy to instance API
app.all('/api/instance/:id/proxy/*', async (req, res) => {
    const config = getConfig();
    const instance = config.instances.find(i => i.id === req.params.id);

    if (!instance) {
        return res.status(404).json({ error: 'Instance not found' });
    }

    const path = req.params[0];
    const url = `http://localhost:${instance.port}/${path}`;

    try {
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: {
                'Content-Type': req.get('Content-Type') || 'application/json'
            },
            timeout: 60000
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.message,
            details: error.response?.data
        });
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`WhatsApp Web Interface running on port ${PORT}`);
});
