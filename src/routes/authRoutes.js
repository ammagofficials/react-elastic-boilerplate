// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/register', authController.createAccount);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/login', authController.loginAccount);

module.exports = router;
