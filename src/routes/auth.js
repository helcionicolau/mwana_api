// src/routes/auth.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota de Login
router.post('/login', authController.login);

//Rota de Logout
router.post('/logout', authController.logout);

// 🔹 Rotas para reset de senha
router.post("/reset-password/request", authController.requestReset);
router.get("/reset-password/validate/:token", authController.validateResetToken);
router.post("/reset-password/reset", authController.resetPassword);

module.exports = router;