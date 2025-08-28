const express = require("express");
const users = require("../routes/user");
const posts = require("../routes/post");
const comments = require("../routes/comment");
const login = require("../routes/login");
const likePost = require("../routes/likePost");
const likeComment = require("../routes/likeComment");
const toggleBookmark = require("../routes/toggleBookmark");
const searchBlogPost = require("../routes/search");


module.exports = (app)=>{
    app.use(express.json()); //parse incoming body to json
    
    // route middlewares
    app.use("/api/users", users);
    app.use("/api/posts", posts);
    app.use("/api/comments", comments);
    app.use("/api/login", login);
    app.use("/api/likePost", likePost);
    app.use("/api/likeComment", likeComment);
    app.use("/api/toggleBookmark", toggleBookmark);
    app.use("/api/search", searchBlogPost);
};