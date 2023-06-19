const express = require('express');
const router = express.Router();
const { createBlog, gettingBlogs, getBlog, updateBlog, deleteBlog} = require('../controllers/blog.js');
const multer = require('multer');

//Setting storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
    //   console.log(file);
      cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
    },
  });

  //initializing multer
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(file.originalname.split('.').pop());
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper image format to upload');
    }
  });

// Creating new Blog 
router.post('/create-blog', upload.single('image'), createBlog);

// Getting all blogs
router.get('/get-all-blogs', gettingBlogs);

// Getting a single blog
router.get('/blog/:id', getBlog);

// Updating a blog
router.put('/blog/:id', updateBlog);

// Deleting a blog
router.delete('/blog/:id', deleteBlog);

module.exports = router;