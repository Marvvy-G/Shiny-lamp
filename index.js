const express = require("express");
const app = express();
const profiles = require("./routes/profiles");

// middlewares
app.use(express.json()); //parse incoming body to json

// route middlewares
app.use("/api/profile", profiles);







// listen for port connections
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`App is currently listening via port ${port}`));






