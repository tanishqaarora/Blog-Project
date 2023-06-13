const express = require('express');
const router = express.Router();
const { createReaction, gettingReactions, updateReaction } = require('../controllers/reaction.js');


// Creating new reaction 
router.post('/create-reaction', createReaction);

// Getting all reactions
router.get('/get-all-reactions', gettingReactions);

// Updating a reaction
router.put('/reaction/:id', updateReaction);

module.exports = router;