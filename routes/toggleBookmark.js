const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const verifyAuthToken = require("../middleware/auth");

const router = express.Router();

// Get all bookmarks associated with a user
router.get("/", verifyAuthToken, async (req, res) => {

    try {
        const result = await User.findById(req.user._id).populate("bookmarkedPosts");
        
        // send response
        res.send({
            message: "Success",
            data: result.bookmarkedPosts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "An unexpected error occurred",
            details: err
        })
    }
});

// Toggle bookmark
router.post("/:id", verifyAuthToken, async (req, res) => {
    try {
         // find post data
        const post = await Post.findById(req.params.id);
        // get user data
        const user = await User.findById(req.user._id);

         // send 404 error if post is not found
        if(!post){
            return res.status(404).send("Post not found!");
        }

        // check if postId already exists in the array
        if(!user.bookmarkedPosts.includes(post._id)){
            // add bookmark
            // include id in the array if not found
            user.bookmarkedPosts.push(post._id);

            // save updated user details
            await user.save();

            // send response
            res.send({
                message: "Successfully added post to bookmark",
            })
        }else{
            // remove bookmark
            // remove id from array if found
            const index =  user.bookmarkedPosts.indexOf(post._id);
            if (index > -1) {
                user.bookmarkedPosts.splice(index, 1);
            }

            // save updated user details
            await user.save();

            // send response
            res.send({
                message: "Successfully removed post from bookmark",
            })
        }

    } catch (error) {
        console.error(err);
        res.status(500).send({
            message: "An unexpected error occurred",
            details: err
        })
    }
});



module.exports = router;