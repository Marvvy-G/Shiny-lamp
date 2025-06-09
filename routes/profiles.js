const express = require("express");
const router = express.Router();

// helper utilities
const {validateProfile} = require("../utilities/utility");


// profile data
let profiles = [
    {
        id: 1,
        name: "sleek",
        age: 26,
        gender: "male"
    }
]

// Get all profile data
router.get("/", (req, res)=>{
    res.send({
        message: "Success!",
        data: profiles
    });
})

// Create a profile
router.post("/", (req, res) => {
    // validate incoming body
    const { error } = validateProfile(req.body);
    if(error){
        res.status(400).send({
            message: "Oops! Failed to create profile.",
            errorDetails: error.details[0].message
        })
    }

    // create new profile instance
    const newProfile = {
        id: profiles.length + 1,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    };

    // push to existing profile data
    profiles.push(newProfile);

    // send response
    res.send({
        message: "Success creating profile!",
        data: profiles
    });
})

// update a profile
router.put("/:id", (req, res)=>{
    // validate incoming body
    const { error } = validateProfile(req.body);
    if(error){
        res.status(400).send({
            message: "Oops! Failed to create profile.",
            errorDetails: error.details[0].message
        })
    }

    // extract profile data that needs to be updated
    const profile = profiles.find(profile => profile.id === Number(req.params.id));

    // throw a 404 error if not found
    if(!profile){
        res.status(404).send("Profile not found!");
    }

    // update profile details with incoming body
    profile.name = req.body.name;
    profile.age = req.body.age;
    profile.gender = req.body.gender;

    // send response
    res.send({
        message: "Success updating profile",
        data: profile
    });
})

module.exports = router;