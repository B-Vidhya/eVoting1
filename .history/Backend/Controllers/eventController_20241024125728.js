const asyncHandler = require("express-async-handler");
const Event = require("../Models/EventModel"); // Import the Event model

// @desc    Create new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    picture,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
  } = req.body;

  // Validate input
  if (
    !name ||
    !description ||
    !picture ||
    !startNominationPhase ||
    !endNominationPhase ||
    !startVotingPhase ||
    !endVotingPhase ||
    !resultPhase
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create event
  const event = await Event.create({
    name,
    description,
    picture,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
  });

  if (event) {
    res.status(201).json(event); // Send the created event back in the response
  } else {
    res.status(400);
    throw new Error("Failed to create the event");
  }
});

module.exports = { createEvent };
