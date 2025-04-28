// /routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); // New route for forgot password
router.post('/reset-password', resetPassword); // New route for resetting password

module.exports = router;
