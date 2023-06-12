const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user');

// Creating new user
router.post('/register', createUser);

// Login user route
// router.post('/login', loginUser);

module.exports = router;