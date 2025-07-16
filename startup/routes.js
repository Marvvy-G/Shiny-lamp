const express = require("express");
const users = require("../routes/user");
const posts = require("../routes/post");
const comments = require("../routes/comment");
const login = require("../routes/login");


module.exports = (app)=>{
    app.use(express.json()); //parse incoming body to json
    
    // route middlewares
    app.use("/api/users", users);
    app.use("/api/posts", posts);
    app.use("/api/comments", comments);
    app.use("/api/login", login);
};