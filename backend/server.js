const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const authRoutes = require(path.join(__dirname, "routes", "auth"));
app.use("/api/auth", authRoutes);

const roomRoutes = require(path.join(__dirname, "routes", "rooms"));
app.use("/api/rooms", roomRoutes);

const roommateRoutes = require(path.join(__dirname, "routes", "roommates"));
app.use("/api/roommates", roommateRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is running! Welcome to the RoomSync Backend API.");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
