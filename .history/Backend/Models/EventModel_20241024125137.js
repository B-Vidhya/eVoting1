const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String, // Assuming you store the file path or URL
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
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
