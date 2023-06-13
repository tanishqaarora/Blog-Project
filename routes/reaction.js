const express = require('express');
const router = express.Router();
const { createReaction, gettingReactions, updateReaction, deleteReaction} = require('../controllers/reaction.js');


// Creating new reaction 
router.post('/create-reaction', createreaction);

// Getting all reactions
router.get('/get-all-reactions', gettingreactions);

// Getting a single reaction
router.get('/reaction/:id', getreaction);

// Updating a reaction
router.put('/reaction/:id', updatereaction);

// Deleting a reaction
router.delete('/reaction/:id', deletereaction);

module.exports = router;