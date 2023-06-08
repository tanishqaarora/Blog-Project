const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

// Add comment
router.post('/add-comment', async(req, res) => {
    try {
        const commentData = req.body;
        const newComment = await db.comment.create(commentData);
        res.status(200).send("Comment Added");
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;