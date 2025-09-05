// src/config/server.js
const express = require('express');
const cors = require('cors');

const createServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json()); // Parse JSON requests
    return app;
};

module.exports = createServer;