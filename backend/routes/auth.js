const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register (Signup)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, state, city } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ name, email, password: hashedPassword, state, city });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("🔥 Error during registration:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Login function
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password (bcrypt)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Extract initials from the user's full name
    const initials = user.name.split(' ').map((name) => name[0]).join('');

    // Send response with token and initials
    res.json({
      message: "Login successful",
      token,
      initials
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
