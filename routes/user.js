const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user');

// Register User
router.post('/register', createUser);

// Login User 
// router.post('/login', loginUser);

module.exports = router;