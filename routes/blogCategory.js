const express = require('express');
const router = express.Router();
const { addBlogCategory, getBlogCategories, updateBlogCategory, deleteBlogCategory } = require('../controllers/blogCategory.js');

// Add category type
router.post('/add-blog-category', addBlogCategory);

// Get all categories
router.get('/blog-categories', getBlogCategories);

// Update category
router.put('/blog-category/:id', updateBlogCategory);

// Delete category
router.delete('/blog-category/:id', deleteBlogCategory);

module.exports = router;