const express = require('express');
const router = express.Router();
const { createBlog, gettingBlogs, getBlog, updateBlog, deleteBlog} = require('../controllers/blog.js');


// Creating new Blog 
router.post('/create-blog', createBlog);

// Getting all blogs
router.get('/get-all-blogs', gettingBlogs);

// Getting a single blog
router.get('/blog/:id', getBlog);

// Updating a blog
router.put('/blog/:id', updateBlog);

// Deleting a blog
router.delete('/blog/:id', deleteBlog);

module.exports = router;