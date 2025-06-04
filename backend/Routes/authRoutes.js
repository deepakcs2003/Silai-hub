const express = require('express');
const { signup, login, googleAuth } = require('../Controller/authController');
const router = express.Router();

// Signup (Without Google)
router.post('/signup', signup);

// Login (Without Google)
router.post('/login', login);

// Signup/Login with Google
router.post('/google', googleAuth);

module.exports = router;
