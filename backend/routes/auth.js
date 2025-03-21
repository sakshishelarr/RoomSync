const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register (Signup)
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
  
  
  

// Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
