const db = require('../models/index.js');

exports.createBlog = async(req, res) => {
    try {
        const { title, description} = req.body;
        if(!title || !description) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
        } else {
            if(title.length > 20) {
                return res.json({
                    msg: "Title exceeds the limit"
                });
            } else {
                const newBlog = await db.blog.create({ title, description });
                // console.log(newBlog);
                return res.status(200).json({
                    msg: "Blog created"
                }); 
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

exports.gettingBlogs = async(req, res) => {
    try {
        const blogs = await db.blog.findAll({
            order: ['createdAt'],
            include: [{
                model: db.comment
            }]
        })
        res.status(200).json({
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.getBlog = async(req, res) => {
    try {
        const getBlog = await db.blog.findOne({
            where: {id: req.params.id},
            include: [{
                model: db.comment
            }]
        });
        // If blog is not found show error else show the blog
        if(!getBlog) {
            return res.status(404).json(`Blog with id ${req.params.id} not found`);
        } else {
            return res.status(200).json({
                blog: getBlog
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: error.message
        });
    }
}

exports.updateBlog = async(req, res) => {
    try {
        // get blog from db
        const getBlogToBeUpdated = await db.blog.findOne({
            where: {id: req.params.id}
        });
        // if blog not found then show error else update the blog
        if(!getBlogToBeUpdated) {
            return res.status(404).json({
                msg: "This blog does not exist"
            });
        } else {
            const { title, description } = req.body;
            console.log(title, `=========${description}`);
            const updatedBlog = await getBlogToBeUpdated.update({ title, description });
            // console.log(updatedBlog);
            res.status(200).json({
                msg: "Blog updated successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.deleteBlog = async(req, res) => {
    try {
        // find the blog
        const getBlogToBeDeleted = await db.blog.findOne({
            where: {id: req.params.id}
        });
        // If blog is not found then show error else delete the blog
        if(!getBlogToBeDeleted) {
            return res.status(404).json({
                msg: `Blog with ${req.params.id} does not exist`
            });
        } else {
            const removeBlog = await db.blog.destroy({
                where: { id: req.params.id }
            });
            return res.json({
                msg: `Blog with id ${req.params.id} is deleted`
        })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        }
        );
    }
}