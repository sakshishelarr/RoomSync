const express = require("express");
const Roommate = require("../models/Roommate");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Roommate Profile
router.post("/create", authMiddleware, async (req, res) => {
  const { name, email, age, gender, occupation, interests, lifestyle } = req.body;
  try {
    const existingProfile = await Roommate.findOne({ user: req.user.id });
    if (existingProfile) return res.status(400).json({ message: "Profile already exists" });

    const roommate = new Roommate({
      name, email, age, gender, occupation, interests, lifestyle, user: req.user.id
    });

    await roommate.save();
    res.json({ message: "Profile created successfully", roommate });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Like Roommate
router.post("/like/:roommateId", authMiddleware, async (req, res) => {
  const currentUser = await Roommate.findOne({ user: req.user.id });
  const likedUser = await Roommate.findById(req.params.roommateId);

  if (!currentUser || !likedUser) return res.status(404).json({ message: "User not found" });

  if (!currentUser.likedUsers.includes(likedUser.user)) {
    currentUser.likedUsers.push(likedUser.user);
    await currentUser.save();
  }

  if (likedUser.likedUsers.includes(req.user.id)) {
    currentUser.matches.push(likedUser.user);
    likedUser.matches.push(req.user.id);
    await likedUser.save();
    await currentUser.save();
    return res.json({ message: "It's a match!" });
  }

  res.json({ message: "Roommate liked!" });
});

module.exports = router;
