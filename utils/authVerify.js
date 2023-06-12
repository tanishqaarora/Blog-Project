const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Get token
        const token = req.header("auth-token");
        // No token
        if(!token) return res.status(401).json({
            msg: "Access denied"
        })
        // Verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

