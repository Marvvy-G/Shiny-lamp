const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const router = express.Router();
// const _ = require("lodash");
const { validateLogin } = require("../utilities/utility");
const User = require("../models/user");

router.post("/", async (req, res)=>{
    // validate incoming body
    const { error } = validateLogin(req.body);
    if(error){
        return res.status(400).send({
            message: "Oops! Failed to create user.",
            errorDetails: error.details[0].message
        })
    }
    
    try {
        const foundUser = await User.findOne({email: req.body.email}); // check if email exists in the database
        if(!foundUser) return res.status(400).send("Invalid email or password!"); // send feedback response if not found
      
        
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password); // compare user password with hashed password
        if(!validPassword) return res.status(400).send("Invalid email or password!"); // if user password doesn't match

                                            // payload                                //secret private key
        const token =  jwt.sign({_id: foundUser._id,fName: foundUser.firstName}, config.get("blog_jwtPrivateKey")); // Generate jwt(jsonWebToken)
        
        res.send({
            message: "Successfully Logged in!",             // send response
            token: token
        });
    } catch (error) {
        console.error(error);
    }
})


module.exports = router;
