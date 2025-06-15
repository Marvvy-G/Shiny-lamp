const mongoose = require("mongoose");


const BlogPost = mongoose.model("Post", new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        // referencing the user id
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, 
    // createdAt and updatedAt timestamps would be included
    { 
        timestamps: true 
    }
));

module.exports = BlogPost;