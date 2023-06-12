const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authVerify');

// If user has token show
// Dashboard Page
router.get('/dashboard', verifyToken, (req, res) => {
    try {
        res.status(200).json({
            msg: `Welcome to dashboard!!`
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
});

module.exports = router;