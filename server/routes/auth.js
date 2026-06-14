const express = require("express");
const router = express.Router();
const User = require("../models/user");


// Login to an existing account
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user in MongoDB
        const user = await User.findOne({ email });

        // 2. If user doesn't exist
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // 3. Check password (plain text for now - prototype)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // 4. Return success + role
        return res.json({
            success: true,
            role: user.role,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
});

// Register a new account
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required."
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists."
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      role
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

module.exports = router;



