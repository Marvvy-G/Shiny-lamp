const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/comment");
const verifyAuthToken = require("../middleware/auth");
const { validateComment } = require("../utilities/utility");
const { getNestedComments } = require("../utilities/helper");


// Get all comments recursively
router.get("/:id", async (req, res) => {

    try {
        const postId = req.params.id;
        // Check if postId is a valid id
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ 
                status: "error", 
                message: 'Invalid post ID' 
            });
        }
        // use recursive function to fetch all comments and nest their replies
        const comments = await getNestedComments(postId);

        res.send({
            status: "success",
            data: comments
        })
    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error!"
        })
    }
});

// Create/Reply comment
router.post("/:id", verifyAuthToken, async (req, res) => {
    // Validate incoming body
    const { error } = validateComment(req.body);
    if(error){
        return res.status(400).send({
            message: "Failed to create comment!",
            details: error.details[0].message
        })
    }

    try {
        const comment = new Comment({
            text: req.body.text,
            authorId: req.user._id,
            postId: req.params.id,
            parentCommentId: req.body.parentCommentId ? req.body.parentCommentId : null
        });

        await comment.save();

        res.send({
            status: 'Success',
            message: comment
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "error",
            message: 'Internal server error'
        })
    }
});

// Delete comment
router.delete("/:id", verifyAuthToken, async (req, res) => {
    try {
        // find comment
        const comment = await Comment.findById(req.params.id);

        // if no comment is found
        if(!comment){
            res.status(404).send({
                status: "error",
                message: "Comment not found!"
            })
        }

        // if user is neither the author of the comment or has an admin role
        if( !comment.authorId.equals(req.user._id) || req.user.role !== "ADMIN" ){
            res.status(401).send({
                status: "error",
                message: "Shoo, no be you write this comment naa"
            })
        };

        // delete comment
        await comment.deleteOne();

        // Send feedback
        res.send({
            status: 'success',
            data: comment
        })
    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error!"
        })
    }
})




module.exports = router;