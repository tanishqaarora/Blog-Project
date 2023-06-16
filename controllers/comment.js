const db = require('../models/index.js');

exports.createComment = async(req, res) => {
    try {
        if(!req.body.content) {
            return res.json({
                msg: "Please add some content"
            });
        } else {
            const { content } = req.body;
            const newComment = await db.comment.create(req.body);
            return res.status(200).json({
                msg: "Comment Added"
            });
        }
    } catch (error) {
         res.status(500).json({
            msg: error.message
        });
    }
}

exports.gettingComments = async(req, res) => {
    try {
        const comments = await db.comment.findAll({});
        res.status(200).json({
            comments: comments
        });
    } catch (error) {
        res.status(500).json( {
            msg: error.message
        });
    }
}

exports.getComment = async(req, res) => {
    try {
        const getComment = await db.comment.findOne({
            where: { id: req.params.id }
        });

        if(!getComment) {
            return res.status(404).json({
                msg: "Comment does not exist"
            })
        }
        return res.status(200).json(getComment);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.updateComment = async(req, res) => {
    try {
        // find comment 
        const commentToBeUpdated = await db.comment.findOne({
            where: {id: req.params.id}
        });
        // if comment not found then show error else update the comment
        if(!commentToBeUpdated) {
            return res.status(404).json({
                msg: "Comment does not exist"
            });
        } else {
            const { content } = req.body;
            const updatedComment = await commentToBeUpdated.update({ content });

            return res.status(200).json({
                msg: "Successfully updated"
            });
            // console.log(updatedComment);
        } 
    } catch (error) {
        res.status(500).json({
            msg: error.message 
        });
    }
}

exports.deleteComment = async(req, res) => {
    try {
        // find the id 
        const commentToBeDeleted = await db.comment.findOne({
            where: {id: req.params.id}
        });
        // if comment not found then show error else delete the comment
        if(!commentToBeDeleted) {
            return res.status(404).json({
                msg: `Comment with ${req.params.id} does not exist`
            });
        } else {
            const removeComment = await db.comment.destroy({
                where: { id: req.params.id }
            });
            return res.json({
                msg: `Comment with id ${req.params.id} is deleted`
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
    
}


