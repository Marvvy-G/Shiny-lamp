const mongoose = require("mongoose");

// mongoose user model with schema
const Users = mongoose.model("User", new mongoose.Schema({
    name: {
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
        minLength: 4
    }
}));


module.exports = Users;