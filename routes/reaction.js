const express = require('express');
const router = express.Router();
const { createReaction, getReactions, deleteReaction } = require('../controllers/reaction.js');


// Creating new reaction 
router.post('/create-reaction', createReaction);

// Getting all reactions
router.get('/get-all-reactions', getReactions);

module.exports = router;