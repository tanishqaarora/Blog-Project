const db = require('../models/index.js');

exports.addReactionCategory = async(req, res) => {
    try {
        const { reaction_type } = req.body;
        if(!reaction_type) {
            return res.status(401).json({
                msg: "Please specify the reaction category"
            })
        } else {
            const addCategoryType = await db.reaction_category.create({ reaction_type })
            return res.status(200).json({
                msg: "Reaction category added",
                reactionCategory: reaction_type
            });
        }
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.getReactionCategories = async(req, res) => {
    try {
        const reactionCategories = await db.reaction_category.findAll({});
        res.status(200).json({
            categories: reactionCategories
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.updateReactionCategory = async(req, res) => {
    try {
        // Get category
        const categoryToBeUpdated = await db.reaction_category.findOne({
            where: {id: req.params.id}
        });
        // If not found
        if(!categoryToBeUpdated) {
            return res.status(404).json({
                msg: "This category does not exist"
            });
        } else {
            const { reaction_type } = req.body;
            console.log(reaction_type);
            const updatedCategory = await categoryToBeUpdated.update({ reaction_type });
            console.log(updatedCategory);
            res.status(200).json({
                msg: "Category updated successfully",

            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.deleteReactionCategory = async(req, res) => {
    try {
        const categories = await db.reaction_category.destroy({
            where: { id: req.params.id}
        })
        res.status(200).json({
            msg: "Category deleted"
        });
    } catch (error) {
        return res.status(200).json({
            msg: "Deleted"
        })
    }
}