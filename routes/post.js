const express = require("express");
const BlogPost = require("../models/post");
const { validateBlogPost, validateUpdateBlogPost, validateDeleteBlogPost } = require("../utilities/utility");
const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
    // pagination variables
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    try {
        // Get a maximum of 10 posts and attach the author's name
        const result = await BlogPost.find().skip((page - 1) * limit).limit(limit).populate("author", "name");
        // send response
        res.send({
            message: "Success",
            data: result
        });
    } catch (err) {
        console.error(err);
    }
});

// create blog post
router.post("/", async (req, res) => {
    // Validate incoming body
    const { error } = validateBlogPost(req.body);
    if(error){
        return res.status(400).send({
            message: "Failed to create post!",
            details: error.details[0].message
        })
    }

    try {
        // create new post instance
        const newPost = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            author: req.body.authorId
        });

        // save new instance to database
        const result = await newPost.save();

        // send response
        res.send({
            message: "Success creating post!",
            data: result
        })
        
    } catch (err) {
        console.error(err)
    }
});

// Update blog post
router.put("/:id", async (req, res) => {
    // Validate incoming body
    const { error } = validateUpdateBlogPost(req.body);
    if(error){
        return res.status(400).send({
                message: "Failed to update post!",
                details: error.details[0].message
            })
    };
    

    try {
        // retrieve post
        const post = await BlogPost.findById(req.params.id);

        // send 404 error if post is not found
        if(!post){
            return res.status(404).send("Post not found!");
        }

        // prevent non author from editing post
        //.equals(): this is a mongoose method for comparing either regular strings or mongoose objectId's to mongoose objectId's
        if(!post.author._id.equals(req.body.userId)){
            return res.status(400).send({
                message: "User not permitted to edit post!",
            });
        };

        // update multiple post details
        post.set({
            title : req.body.title,
            content: req.body.content
        });

        // save updated post details
        const result = await post.save();

        // send response
        res.send({
            message: "Successfully updated post",
            data: result
        })

    } catch (err) {
        console.error(err)
    }
});

// delete blog post
router.delete("/:id", async (req, res) => {
    // Validate incoming body
    const { error } = validateDeleteBlogPost(req.body);
    if(error){
        return res.status(400).send({
            message: "Failed to delete post!",
            details: error.details[0].message
        })
    };

    try {
        const post = await BlogPost.findById(req.params.id);

        // send 404 error if post is not found
        if(!post){
            return res.status(404).send("Post not found!");
        }

        // prevent non author from deleting post
        if(!post.author._id.equals(req.body.userId)){
            return res.status(400).send({
                message: "User not permitted to delete post!",
            });
        };

        // delete post from database
        const result = await post.deleteOne();

        // send response
        res.send({
            message: "Successfully deleted post",
            data: result
        })

    } catch (err) {
        console.error(err)
    }
});


module.exports = router; 