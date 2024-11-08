// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.createAccount);
router.post('/login', authController.loginAccount);

module.exports = router;