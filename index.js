const express = require("express");
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const login = require("./routes/login");
// const verifyAuthToken = require("./middleware/auth");

// middlewares
app.use(express.json()); //parse incoming body to json
// app.use(verifyAuthToken)

// route middlewares
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/login", login);







// connect to mongodb
mongoose.connect("mongodb://localhost/blog")
.then(()=> console.log("successfully connected to mongodb"))
.catch((err)=> console.error(err));



// listen for port connections
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`App is currently listening via port ${port}`));






