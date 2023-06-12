const express = require('express');
const router = express.Router();
const { createUser, loginUser, gettingUsers, getUser, updateUser, deleteUser } = require('../controllers/user');

// Register User
router.post('/register', createUser);

// Login User 
router.post('/login', loginUser);

// Getting all users
router.get('/users', gettingUsers);

// Get a single user
router.get('/user/:id', getUser);

// Update a user
router.put('/user/:id', updateUser);

// Delete a user
router.delete('/user/:id', deleteUser);

module.exports = router;