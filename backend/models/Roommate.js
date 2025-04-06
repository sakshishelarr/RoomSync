const mongoose = require("mongoose");

const RoommateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  occupation: { type: String, required: true },
  interests: [String],
  lifestyle: {
    cleanliness: { type: String, enum: ["Messy", "Moderate", "Very Clean"], required: true },
    sleepingHabits: { type: String, enum: ["Early Bird", "Night Owl"], required: true },
    petFriendly: { type: Boolean, required: true }
  },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Roommate", RoommateSchema);
