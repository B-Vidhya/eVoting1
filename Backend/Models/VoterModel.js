const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming you have a User model
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const Voter = mongoose.model("Voter", VoterSchema);

module.exports = Voter;
