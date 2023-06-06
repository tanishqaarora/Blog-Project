const express = require('express');
const router = express.Router();
const db = require('../models/index.js');
const blog = require('../models/blog');

// Creating new Blog 
router.post('/create-blog', async(req, res) => {
    const blogData = req.body;
    const newBlog = await db.blog.create(blogData);

    // console.log(newBlog);
    res.status(200).send("Blog created");
})

// Getting all blogs
router.get('/get-all-blogs', async(req, res) => {
    const blogs = await db.blog.findAll({
        order: ['createdAt']
    })

    // console.log(blogs);
    res.status(200).send(blogs);
})

// Getting a single blog
router.get('/blog/:id', async(req, res) => {
    const getBlog = await db.blog.findOne({
        where: {id: req.params.id}
    });

    // console.log(getBlog);
    res.status(200).send(getBlog);
})

// Updating a blog
router.put('/blog/:id', async(req, res) => {
    const getBlogToBeUpdated = await db.blog.findOne({
        where: {id: req.params.id}
    });
    const updatedData = req.body;
    const updatedBlog = await getBlogToBeUpdated.update({ updatedData });

    // console.log(updatedBlog);
    res.status(200).send(updatedBlog);
})

// Deleting a blog
router.delete('/blog/:id', async(req, res) => {
    const removeBlog = await db.blog.destroy({
        where: { id:req.params.id }
    });
    
    // console.log("deleted");
    res.send("Blog deleted");
    
})

module.exports = router;