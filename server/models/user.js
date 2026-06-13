const mongoose = require("mongoose");

//this file creates the User model for the MongoDB database.
// each user has three properties: email, password, and role.

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "faculty", "admin"],
        default: "student"
    }
});

module.exports = mongoose.model("User", userSchema);