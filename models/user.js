const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");


// user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:50,
    },
    email: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 1024
    }
});

// token generation method
userSchema.methods.generateAuthToken = function (){

    const token =  jwt.sign(
        {_id: this._id,fName: this.firstName}, // payload
        config.get("blog_jwtPrivateKey") // Secret private key
    ); 

    return token;
}
// mongoose user model with schema
const Users = mongoose.model("User", userSchema);


module.exports = Users;