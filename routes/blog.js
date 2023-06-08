const express = require('express');
const router = express.Router();
const db = require('../models/index.js');


// Creating new Blog 
router.post('/create-blog', async(req, res) => {
    try {
        const blogData = req.body;
        const newBlog = await db.blog.create(blogData);
        // console.log(newBlog);
        res.status(200).send("Blog created");
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Getting all blogs
router.get('/get-all-blogs', async(req, res) => {
    try {
        const blogs = await db.blog.findAll({
            order: ['createdAt'],
            include: [{
                model: db.comment
            }]
        })
        console.log(blogs);
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Getting a single blog
router.get('/blog/:id', async(req, res) => {
    try {
        const getBlog = await db.blog.findOne({
            where: {id: req.params.id}
        });

        // console.log(getBlog);
        res.status(200).send(getBlog);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Updating a blog
router.put('/blog/:id', async(req, res) => {
    try {
        const getBlogToBeUpdated = await db.blog.findOne({
            where: {id: req.params.id}
        });
        const updatedData = req.body;
        const updatedBlog = await getBlogToBeUpdated.update({ updatedData });

        // console.log(updatedBlog);
        res.status(200).send(updatedBlog);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Deleting a blog
router.delete('/blog/:id', async(req, res) => {
    try {
        const removeBlog = await db.blog.destroy({
            where: { id:req.params.id }
        });
        
        // console.log("deleted");
        res.send("Blog deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
    
})

module.exports = router;