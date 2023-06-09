const express = require('express');
const router = express.Router();
const { createComment, gettingComments, getComment, updateComment, deleteComment } = require('../controllers/comment.js');

// Add comment
router.post('/add-comment', createComment);

// Getting all comments
router.get('/get-all-comments', gettingComments);

// Get a comment
router.get('/comment/:id', getComment);

// Updating a comment
router.put('/comment/:id', updateComment);

// Deleting a comment
router.delete('/comment/:id', deleteComment);

module.exports = router;