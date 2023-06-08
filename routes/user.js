const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

// Create user
router.post('/register', async(req, res) => {
    try {
        if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send("Please fill all the fields");
        } 

        if(req.body.email) {

        }
            const userData = req.body;
            
            const newUser = await db.user.create(userData);
            console.log(newUser);
            return res.status(200).send(newUser);
            
    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
})

// Login user
router.post('/login', async(req, res) => {
    try {

    } catch (error) {

    }
})

module.exports = router;