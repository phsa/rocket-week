const express = require('express')

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({ message: 'Hello, Paulo!'})
});

routes.post('/devs', (request, response) => {
    response.json({ok: true})
});

module.exports = routes;