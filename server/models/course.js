const mongoose = require("mongoose");

//this file creates the Course model for the MongoDB database.

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    skills_covered: {
        type: [String],
        required: true
    },

    prerequisites: {
        type: [String],
        required: true
    },

});

module.exports = mongoose.model("Course", courseSchema);