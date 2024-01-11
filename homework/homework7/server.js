const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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
    } else {
        res.status(400).send('Invalid request: Name and phone are required.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
