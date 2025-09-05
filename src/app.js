// src/app.js
require('dotenv').config();
const express = require('express');
const createServer = require('./config/server');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logger = require('./utils/logger');

const app = createServer();
connectDB();

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
