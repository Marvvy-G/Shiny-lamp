const Comment = require("../models/comment");


const getNestedComments = async (postId, parentCommentId = null) => {
    // Base Case
    // fetch all top-level comments (where parentCommentId is null)
    const comments = await Comment.find({
        postId: postId,
        parentCommentId: parentCommentId
    }).sort({createdAt: 1}).lean();
    
    // Recursive case
    // for every top level comment, recall the function but this time pass the comment id's as the parent comment id
    for (const comment of comments) {
        comment.replies = await getNestedComments(postId, comment._id);
    }

    return comments;
}

module.exports.getNestedComments = getNestedComments;