const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
// model
const Users = require("../models/user");

// helper utilities
const { validateUser, validateUpdateUser } = require("../utilities/utility");



// Get all users
router.get("/", async (req, res)=>{
    const page = req.query.page || 1; //set page number
    const limit = req.query.limit || 10; // set limit to data returned

    try {
        const users = await Users.find().skip((page - 1) * limit).limit(limit);
        // send response
        res.send({
            message: "Success!",
            data: users
        })
    } catch (err) {
        console.error(err)
    }
})

// Create a user
router.post("/", async (req, res) => {
    // validate incoming body
    const { error } = validateUser(req.body);
    if(error){
        return res.status(400).send({
            message: "Oops! Failed to create user.",
            errorDetails: error.details[0].message
        })
    }

    try {
         // create new profile instance
        let newUser = new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password
        })

        // Hash password using bcrypt
        newUser.password = await bcrypt.hash(req.body.password, 10);

        // save new user in database
        await newUser.save();

        // send response
        res.send({
            message: "Success creating user!",
            data: _.pick(newUser, ["_id","firstName","lastName","email"])
        });
    } catch (err) {
        console.error(err)
    }
   
})

// update a user
router.put("/:id", async (req, res)=>{
    // validate incoming body
    const { error } = validateUpdateUser(req.body);
    if(error){
        return res.status(400).send({
            message: "Oops! Failed to create user.",
            errorDetails: error.details[0].message
        })
    }

    try {
        // extract and update user data
        const updatedUser = await Users.findByIdAndUpdate(
            // user id
            req.params.id, 
            // updated data
            {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                age : req.body.age,
                gender : req.body.gender,
                email: req.body.email
            },
            // return updated data instead of original data
            { 
                new: true
            }
        )

        // throw a 404 error if user was not found
        if(!updatedUser){
            return res.status(404).send("User not found!");
        }

        // send response
        res.send({
            message: "Success updating user",
            data: updatedUser
        });
    } catch (err) {
        console.error(err);
    }
    
})

module.exports = router;