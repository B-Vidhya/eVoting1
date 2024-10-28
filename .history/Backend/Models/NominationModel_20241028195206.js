const mongoose = require("mongoose");

const nominationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    cgpa: { type: Number, required: true },
    attendance: { type: Number, required: true },
    reason: { type: String, required: true },
    image: { type: String },
    eventId: { type: String, required: true },
    status: { type: String, default: "Pending" },
    votes: { type: Number, default: 0 }, // New field to store vote counts
  },
  { timestamps: true }
);

const Nomination = mongoose.model("Nomination", nominationSchema);
module.exports = Nomination;
