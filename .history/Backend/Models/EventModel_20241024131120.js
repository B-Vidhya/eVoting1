const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  startNominationPhase: {
    type: Date,
    required: true,
  },
  endNominationPhase: {
    type: Date,
    required: true,
  },
  startVotingPhase: {
    type: Date,
    required: true,
  },
  endVotingPhase: {
    type: Date,
    required: true,
  },
  resultPhase: {
    type: Date,
    required: true,
  },
  // Add isActive field
  isActive: {
    type: Boolean,
    default: true, // Default to true when event is created
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
