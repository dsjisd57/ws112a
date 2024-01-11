const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 3000;

let contacts = [];

app.use(bodyParser.json());

// API 路由
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
    const { name, phone } = req.body;

    if (name && phone) {
        const newContact = { name, phone };
        contacts.push(newContact);
        res.status(201).json(newContact);

        // 發送更新通訊錄的消息給所有連接的客戶端
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(contacts));
            }
        });
    } else {
        res.status(400).send('Invalid request: Name and phone are required.');
    }
});

// WebSocket 處理
wss.on('connection', ws => {
    ws.on('message', message => {
        const { action, data } = JSON.parse(message);

        switch (action) {
            case 'fetchContacts':
                ws.send(JSON.stringify(contacts));
                break;
            case 'addContact':
                const { name, phone } = data;
                if (name && phone) {
                    const newContact = { name, phone };
                    contacts.push(newContact);

                    // 發送更新通訊錄的消息給所有連接的客戶端
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(contacts));
                        }
                    });
                }
                break;
            default:
                break;
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
