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
    image: { type: String }, // Assuming you are storing base64 image or URL
    eventId: { type: String, required: true }, // Add an eventId to associate nominations with events
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Nomination = mongoose.model("Nomination", nominationSchema);
module.exports = Nomination;
