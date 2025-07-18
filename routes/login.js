const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { validateLogin } = require("../utilities/utility");
const User = require("../models/user");

router.post("/", async (req, res)=>{
    // validate incoming body
    const { error } = validateLogin(req.body);
    if(error){
        return res.status(400).send({
            message: "Oops! Failed to login user.",
            errorDetails: error.details[0].message
        })
    }
    
    try {
        const foundUser = await User.findOne({email: req.body.email}); // check if email exists in the database
        if(!foundUser) return res.status(400).send("Invalid email or password!"); // send feedback response if not found
        
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password); // compare user password with hashed password
        if(!validPassword) return res.status(400).send("Invalid email or password!"); // send feedback if user password doesn't match

        const token = foundUser.generateAuthToken(); //Generate authToken using method created by encapsulating the login in model
        
        res.send({
            message: "Successfully Logged in!",             // send response
            token: token
        });
    } catch (error) {
        console.error(err);
        res.status(500).send({
            message: "An unexpected error occurred",
            details: err
        })
    }
})


module.exports = router;
