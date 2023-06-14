const db = require('../models/index.js');

exports.addBlogCategory = async(req, res) => {
    try {
        const { blog_type } = req.body;
        if(!blog_type) {
            return res.status(401).json({
                msg: "Please specify the blog category"
            })
        } else {
            const addCategoryType = await db.blog_category.create({ blog_type })
            return res.status(200).json({
                msg: "Blog category added",
                blogCategory: blog_type
            });
        }
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.getBlogCategories = async(req, res) => {
    try {
        const blogCategories = await db.blog_category.findAll({});
        res.status(200).json({
            categories: blogCategories
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.updateBlogCategory = async(req, res) => {
    try {
        // Get category
        const categoryToBeUpdated = await db.blog_category.findOne({
            where: {id: req.params.id}
        });
        // If not found
        if(!categoryToBeUpdated) {
            return res.status(404).json({
                msg: "This category does not exist"
            });
        } else {
            const { blog_type } = req.body;
            console.log(blog_type);
            const updatedCategory = await categoryToBeUpdated.update({ blog_type });
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

exports.deleteBlogCategory = async(req, res) => {
    try {
        const categories = await db.blog_category.destroy({
            where: { id: req.params.id}
        })
        res.status(200).json({
            msg: "Category deleted"
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

