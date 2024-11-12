// src/app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

// Export the configured app without starting it
module.exports = app;
