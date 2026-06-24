const express = require("express");
const router = express.Router();
const MeetingRequest = require("../models/meetingRequest");


// Create a new meeting request
router.post("/", async (req, res) => {
  try {
    const { studentId, name, psuId } = req.body;

    // Basic validation
    if (!studentId || !name || !psuId) {
      return res.status(400).json({
        message: "Student ID, name, and PSU ID are required."
      });
    }

    // Create new meeting request
    const meetingRequest = new MeetingRequest({
      studentId,
      name,
      psuId
    });

    await meetingRequest.save();

    res.status(201).json({
      success: true,
      message: "Meeting request created successfully."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// Get all meeting requests
router.get("/", async (req, res) => {
  try {
      const users = await MeetingRequest.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error."
      });
    }
});

module.exports = router;