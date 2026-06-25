const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// Add a new course
router.post("/", async (req, res) => {
  try {
    const { name, skills_covered, prerequisites } = req.body;
    const course = new Course({ name, skills_covered, prerequisites });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add list of new courses
router.post("/import", async (req, res) => {try {
    const courses = req.body;

    if (!Array.isArray(courses)) {
      return res.status(400).json({
        message: "Expected an array of courses"
      });
    }

    const result = await Course.bulkWrite(
    courses.map(course => ({
      updateOne: {
        filter: { name: course.name },
        update: { $set: course },
        upsert: true
      }
    }))
  );

    res.status(201).json({
      message: `Import successful. ${result.upsertedCount} courses added, ${result.modifiedCount} updated.`
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;