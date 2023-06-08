const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

// Add comment
router.post('/add-comment', async(req, res) => {
    try {
        if(!req.body.content) {
            return res.send("Please add some content");
        } else {
            const commentData = req.body;
            const newComment = await db.comment.create(commentData);
            return res.status(200).send("Comment Added");
        }
    } catch (error) {
         res.status(500).send({
            msg: error.message
        });
    }
})

// Getting all comments
router.get('/get-all-comments', async(req, res) => {
    try {
        const comments = await db.comment.findAll({});
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Get a comment
router.get('/comment/:id', async(req, res) => {
    try {
        const getComment = await db.comment.findOne({
            where: { id: req.params.id }
        });
        res.status(200).send(getComment);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Updating a comment
router.put('/comment/:id', async(req, res) => {
    try {
        // find comment 
        const commentToBeUpdated = await db.comment.findOne({
            where: {id: req.params.id}
        });
        // if comment not found then show error else update the comment
        if(!commentToBeUpdated) {
            return res.status(404).send("Comment not exist");
        } else {
            const updatedComment = await commentToBeUpdated.update({ content: "amazing stuff" });

            return res.status(200).send("Successfully updated");
            console.log(updatedComment);
        } 
    } catch (error) {
        res.status(500).json(error.message);
    }
})


// Deleting a comment
router.delete('/comment/:id', async(req, res) => {
    try {
        // find the id 
        const commentToBeDeleted = await db.comment.findOne({
            where: {id: req.params.id}
        });
        // if comment not found then show error else delete the comment
        if(!commentToBeDeleted) {
            return res.status(404).send(`Comment with ${req.params.id} does not exist`);
        } else {
            const removeComment = await db.comment.destroy({
                where: { id:req.params.id }
            });
            return res.send(`Comment with id ${req.params.id} is deleted`);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    
})

module.exports = router;