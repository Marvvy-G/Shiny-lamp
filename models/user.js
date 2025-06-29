const mongoose = require("mongoose");

// mongoose user model with schema
const Users = mongoose.model("User", new mongoose.Schema({
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
}));


module.exports = Users;