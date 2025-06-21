const express = require("express");
const router = express.Router();
const Users = require("../models/user");

// helper utilities
const { validateUser } = require("../utilities/utility");



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
        res.status(400).send({
            message: "Oops! Failed to create user.",
            errorDetails: error.details[0].message
        })
    }

    try {
         // create new profile instance
        const newUser = new Users({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        })


        // save new user in database
        const result = await newUser.save();

        // send response
        res.send({
            message: "Success creating user!",
            data: result
        });
    } catch (err) {
        console.error(err)
    }
   
})

// update a user
router.put("/:id", async (req, res)=>{
    // validate incoming body
    const { error } = validateUser(req.body);
    if(error){
        res.status(400).send({
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
                name: req.body.name,
                age : req.body.age,
                gender : req.body.gender
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