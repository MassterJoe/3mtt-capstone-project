const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/user');
const { authenticate } = require('../middlewares/jwt');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Fetch user details (protected route)
router.get('/profile', getUser);

module.exports = router;
