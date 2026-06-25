const express = require("express");
const router = express.Router();
const MeetingRequest = require("../models/meetingRequest");


// Create a new meeting request
router.post("/", async (req, res) => {
  try {
    const { studentId, name, psuId, courseIds } = req.body;

    // Basic validation
    if (!studentId || !name || !psuId) {
      return res.status(400).json({
        message: "Student ID, name, PSU ID, and course IDs are required."
      });
    }

    // Create new meeting request
    const meetingRequest = new MeetingRequest({
      studentId,
      name,
      psuId,
      courseIds
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

// Delete a meeting request
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const meetingRequest = await MeetingRequest.findByIdAndDelete(id);

    if (!meetingRequest) {
      return res.status(404).json({
        message: "Meeting request not found."
      });
    }

    res.json({
      success: true,
      message: "Meeting request deleted successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

// Get a meeting request by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meetingRequest = await MeetingRequest.findById(id);

    if (!meetingRequest) {
      return res.status(404).json({
        message: "Meeting request not found."
      });
    }

    res.json(meetingRequest);
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