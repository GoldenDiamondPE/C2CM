const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// Add a new job
router.post("/", async (req, res) => {
  try {
    const { title, company, location, required_skills } = req.body;
    const job = new Job({ title, company, location, required_skills });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add list of new jobs
router.post("/import", async (req, res) => {try {
    const jobs = req.body;

    if (!Array.isArray(jobs)) {
      return res.status(400).json({
        message: "Expected an array of jobs"
      });
    }

    const result = await Job.bulkWrite(
    jobs.map(job => ({
      updateOne: {
        filter: { title: job.title },
        update: { $set: job },
        upsert: true
      }
    }))
  );

    res.status(201).json({
      message: `Import successful. ${result.upsertedCount} jobs added, ${result.modifiedCount} updated.`
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;