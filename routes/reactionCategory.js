const express = require('express');
const router = express.Router();
const { addReactionCategory, getReactionCategories, updateReactionCategory, deleteReactionCategory } = require('../controllers/reactionCategory.js');

// Add category type
router.post('/add-reaction-category', addReactionCategory);

// Get all categories
router.get('/reaction-categories', getReactionCategories);

// Update category
router.put('/reaction-category/:id', updateReactionCategory);

// Delete category
router.delete('/reaction-category/:id', deleteReactionCategory);

module.exports = router;