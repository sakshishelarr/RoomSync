const express = require("express");
const Room = require("../models/Room");
const authMiddleware = require("../middleware/auth"); // Ensure user is authenticated

const router = express.Router();

// ✅ Create a new Room Listing
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, location, price, roommatesPreferred } = req.body;

    // Check if all required fields are present
    if (!title || !description || !location || !price || !roommatesPreferred) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new room object
    const room = new Room({
      title,
      description,
      location,
      price,
      roommatesPreferred,
      user: req.user.id, // The user who created the room is saved in the `user` field
    });

    // Save the room in the database
    await room.save();

    // Return a success message and the room object
    res.json({ message: "Room listed successfully", room });
  } catch (error) {
    // Handle errors that might occur during the room creation process
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Error creating room", error });
  }
});

// ✅ Get All Available Rooms
router.get("/", async (req, res) => {
  try {
    // Fetch all rooms, including the user details who created them
    const rooms = await Room.find().populate("user", "name email");

    // If no rooms found
    if (rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    // Return the rooms data
    res.json(rooms);
  } catch (error) {
    // Handle errors
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching rooms", error });
  }
});

// ✅ Search Rooms by Location
router.get("/search/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // Find rooms by location and include user details
    const rooms = await Room.find({ location }).populate("user", "name email");

    if (rooms.length === 0) {
      return res.status(404).json({ message: `No rooms found in ${location}` });
    }

    // Return rooms that match the search location
    res.json(rooms);
  } catch (error) {
    console.error("Error searching rooms:", error);
    res.status(500).json({ message: "Error searching rooms", error });
  }
});

module.exports = router;
