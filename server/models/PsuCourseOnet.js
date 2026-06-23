const mongoose = require("mongoose");

const psuCourseOnetSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    course_code: { type: String, required: true },
    course_title: { type: String, required: true },
    credits: { type: Number },
    onets_skills: { type: [String], default: [] },
    description: { type: String },
    prerequisites: { type: Array, default: [] }, // Handles single string or arrays like ["STAT 500"]
    category: { type: String },
    level: { type: String },
    cross_listed_with: { type: String, default: null }
}, { 
    collection: 'psu_courses_onet_skills',
    versionKey: false 
});

module.exports = mongoose.model("PsuCourseOnetSkill", psuCourseOnetSchema, "psu_courses_onet_skills");
