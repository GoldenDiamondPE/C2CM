const mongoose = require("mongoose");

//this file creates the MeetingRequest model for the MongoDB database.

const meetingRequestSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    psuId: {
        type: String,
        required: true
    },

    courseIds: {
        type: [String],
        required: true
    },
    
    jobIds: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model("MeetingRequest", meetingRequestSchema);