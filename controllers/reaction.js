const db = require('../models/index.js');

exports.createReaction = async(req, res) => {
    try {
        const { userId, blogId, commentId, reactionId } = req.body;
        console.log(req.body);

        // Check for the reaction
        if(!reactionId) {
            return res.status(200).json({
                msg: "No reaction"
            });
        }
        
        // If neither the case
        if(blogId && commentId) {
            return res.status(401).json({
                msg: "This case is not possible"
            })
        }

        // ** REACTION ON BLOG **
        if(blogId && userId) {
            const getReaction = await db.reaction.findOne({
                where: [
                    { userId: req.body.userId},
                    { blogId: req.body.blogId}
                ]
            })
            // If Found
            if(getReaction) {
                // Same Reaction
                if(getReaction.reactionId.toString() === reactionId) {
                    return res.status(401).json({
                        msg: "Invalid. Reaction already added",
                    })
                } else {
                    // Update reaction
                    // console.log(getReaction);
                    const updateReaction = await getReaction.update({ reactionId });
                    return res.status(200).json({
                        msg: "Updated successfully",
                    })
                }
            } 
            // If Not Found
            if(!getReaction || !getReaction.reactionId) {
                // Add reaction
                const addReaction = await db.reaction.create(req.body);
                return res.status(200).json({
                    msg: "Reaction added on blog"
                });
            }
            
        }

        // ** REACTION ON COMMENT **
        if(commentId && userId) {
            const getReaction = await db.reaction.findOne({
                where: [
                    { userId: req.body.userId},
                    { commentId: req.body.commentId}
                ]
            })
            // If Found
            if(getReaction) {
                // check if same reaction
                if(getReaction.reactionId.toString() === reactionId) {
                    return res.status(401).json({
                        msg: "Invalid. Reaction already added"
                    })
                } else {
                    // Update reaction
                    const updateReaction = await getReaction.update({ reactionId });
                    return res.status(200).json({
                        msg: "Updated successfully",
                    })
                }
            } 
            // If Not Found
            if(!getReaction || !getReaction.commentId) {
                // Add reaction
                const addReaction = await db.reaction.create(req.body);
                return res.status(200).json({
                    msg: "Reaction added on comment"
                });
            }
            
        }
        return res.status(401).json({
            msg: "Invalid request"
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.getReactions = async(req, res) => {
    try {
        const allReactions = await db.reaction.findAll({});
        return res.status(200).json({
            msg: "success",
            reactions: allReactions
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}
