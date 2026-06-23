const mongoose = require("mongoose");

//this file creates the Student model for the MongoDB database.
// each student has several properties.

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },

    middlename: {
        type: String,
        required: true,
        unique: true
    },

    lastname: {
        type: String,
        required: true,
        unique: true
    },

    studentid: {
        type: String,
        required: true,
        unique: true
    },
    
    major: {
        type: String,
        required: true,
        unique: true
    },
    
    minor: {
        type: String,
        required: true,
        unique: true
    },

    courses: {
        type: [String],
        default: []
    },

    additionalcourses: {
        type: [String],
        default: []
    },
    
    skills: {
        type: [String],
        default: []
    },

    additionalskills: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("Student", studentSchema);