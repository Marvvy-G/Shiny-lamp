
const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null    //null indicates a top level comment
    }

}, { timestamps: true }));

module.exports = Comment;