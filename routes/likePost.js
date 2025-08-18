const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const verifyAuthToken = require("../middleware/auth");

const router = express.Router();


router.post("/:id", verifyAuthToken, async (req, res) => {
    try {
         // find post
        const post = await Post.findById(req.params.id);

         // send 404 error if post is not found
        if(!post){
            return res.status(404).send("Post not found!");
        }

        // check if userId already exists in the array
        if(!post.likeUserIds.includes(req.user._id)){
            // LIKE
            // include id in the array if not found
            post.likeUserIds.push(req.user._id);

            // save updated post details
            await post.save();

            // send response
            res.send({
                message: "Successfully liked post",
            })
        }else{
            // UNLIKE
            // remove id from array if found
            const index = post.likeUserIds.indexOf(req.user._id);
            if (index > -1) {
                post.likeUserIds.splice(index, 1);
            }

            // save updated post details
            await post.save();

            // send response
            res.send({
                message: "Successfully un-liked post",
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