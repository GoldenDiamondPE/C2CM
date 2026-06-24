const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");


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
            email: user.email,
            id: user._id
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
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }
    res.json({
      message: "User deleted successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

// Edit a user
router.put("/users/:id", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation
    if (!email && !password && !role) {
      return res.status(400).json({
        message: "At least one of email, password, or role is required."
      });
    }

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Update the user's information
    if (email!=="") user.email = email;
    if (password!=="") user.password = password;
    if (role!=="") user.role = role;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Account updated successfully."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// Get a student by studentid
router.get("/students/:studentid", async (req, res) => {
  try {
    const studentid = req.params.studentid;
    const student = await Student.findOne({ _studentid: String(studentid) }).lean();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
      const cleaned = { student };
      ["courses", "additionalcourses", "skills", "additionalskills"].forEach(
        (field) => {
          if (Array.isArray(cleaned[field]) && cleaned[field].length === 0) {
            delete cleaned[field];
          }
        }
      );
      res.json(cleaned);
    } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});


module.exports = router;