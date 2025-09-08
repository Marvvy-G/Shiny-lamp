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
        image: {
            type: [ String ]
        },
        video: {
            type: [ String ]
        },
        // referencing the user id
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likeUserIds: {
            type:[ mongoose.Schema.Types.ObjectId ],
            ref: "User",
            default: []
        }
    },
    // createdAt and updatedAt timestamps would be included
    { 
        timestamps: true 
    }
));

module.exports = BlogPost;