// src/routes/secureRoutes.js
const express = require('express');
const secureController = require('../controllers/secureController');
const verifyToken = require('../middleware/jwtMiddleware');

const router = express.Router();

router.get('/protected', verifyToken, secureController.getProtectedData);

module.exports = router;
