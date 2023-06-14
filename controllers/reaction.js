const db = require('../models/index.js');

exports.updateReaction = async(req, res) => {
    try {
        const reactedBy = req.body.userId;
        const { reactedOnBlog, reactedOnComment} = req.body;
        const reactionId = req.params.id
        const getReaction = db.reaction.findOne({
            where: { id: reactionId },
            include: [{
                model: db.reaction_category
            }]
        })
        // Check if reaction on blog or comment
        console.log(getReaction,"----", reactedOnBlog, "----", reactedOnComment, "----", reactionId);
        res.send(getReaction);

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}