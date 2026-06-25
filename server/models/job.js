const mongoose = require("mongoose");

//this file creates the Job model for the MongoDB database.

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    required_skills: {
        type: [String],
        required: true
    },

});

module.exports = mongoose.model("Job", jobSchema);