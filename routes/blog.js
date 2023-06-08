const express = require('express');
const router = express.Router();
const db = require('../models/index.js');


// Creating new Blog 
router.post('/create-blog', async(req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.description) {
            return res.status(400).send("Please fill all the fields");
        } else {
            const blogData = req.body;
            if(req.body.title.length > 20) {
                return res.send("Title exceeds the limit");
            }
            const newBlog = await db.blog.create(blogData);
            console.log(newBlog);
            return res.status(200).send("Blog created");   
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
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
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Getting a single blog
router.get('/blog/:id', async(req, res) => {
    try {
        const getBlog = await db.blog.findOne({
            where: {id: req.params.id},
            include: [{
                model: db.comment
            }]
        });
        // If blog is not found show error else show the blog
        if(!getBlog) {
            return res.status(404).send(`Blog with id ${req.params.id} not found`);
        } else {
            return res.status(200).send(getBlog);
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
})

// Updating a blog
router.put('/blog/:id', async(req, res) => {
    try {
        // get blog from db
        const getBlogToBeUpdated = await db.blog.findOne({
            where: {id: req.params.id}
        });
        // if blog not found then show error else update the blog
        if(!getBlogToBeUpdated) {
            return res.status(404).send("This blog does not exist");
        } else {
            const updatedBlog = await getBlogToBeUpdated.update( { description: "Some edited content"});
            // console.log(updatedBlog);
            res.status(200).send("Blog updated successfully");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Deleting a blog
router.delete('/blog/:id', async(req, res) => {
    try {
        // find the blog
        const getBlogToBeDeleted = await db.blog.findOne({
            where: {id: req.params.id}
        });
        // If blog is not found then show error else delete the blog
        if(!getBlogToBeDeleted) {
            return res.status(404).send(`Blog with ${req.params.id} does not exist`);
        } else {
            const removeBlog = await db.blog.destroy({
                where: { id:req.params.id }
            });
            return res.send(`Blog with id ${req.params.id} is deleted`);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;