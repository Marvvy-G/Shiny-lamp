const express = require("express");
const BlogPost = require("../models/post");
const { validateSearchBlogPost } = require("../utilities/utility");
const router = express.Router();

router.get("/", async (req, res) => {

    // Make sure keyword is available
    const { error } = validateSearchBlogPost(req.query);
    if(error){
        return res.status(400).send({
            message: "Search field cannot be empty!",
            details: error.details[0].message
        })
    };


    // pagination variables
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // regex details
    const regex = new RegExp(req.query.keyword, 'i'); // 'i' for case-insensitive

     try {
        // Get a maximum of 10 posts related to the keyword based on their titles and attach the author's name
        const result = await BlogPost.find({ title: regex }).skip((page - 1) * limit).limit(limit).populate("authorId", "name");
        // send response
        res.send({
            message: "Success",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "An unexpected error occurred",
            details: err
        })
    }
});



module.exports = router;