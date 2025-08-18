const express = require("express");
const Comment = require("../models/comment");
const verifyAuthToken = require("../middleware/auth");

const router = express.Router();


router.post("/:id", verifyAuthToken, async (req, res) => {
    try {
         // find comment
        const comment = await Comment.findById(req.params.id);

         // send 404 error if comment is not found
        if(!comment){
            return res.status(404).send("comment not found!");
        }

        // check if userId already exists in the array
        if(!comment.likeUserIds.includes(req.user._id)){
            // LIKE
            // include id in the array if not found
            comment.likeUserIds.push(req.user._id);

            // save updated comment details
            await comment.save();

            // send response
            res.send({
                message: "Successfully liked comment",
            })
        }else{
            // UNLIKE
            // remove id from array if found
            const index = comment.likeUserIds.indexOf(req.user._id);
            if (index > -1) {
                comment.likeUserIds.splice(index, 1);
            }

            // save updated comment details
            await comment.save();

            // send response
            res.send({
                message: "Successfully un-liked comment",
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