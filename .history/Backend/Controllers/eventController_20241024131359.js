const asyncHandler = require("express-async-handler");
const Event = require("../Models/EventModel");

// Create Event
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
    isActive, // Add isActive field
  } = req.body;

  // Validate required fields
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
    throw new Error("Please fill in all required fields.");
  }

  // Create event with isActive field (default to true if not provided)
  const event = await Event.create({
    name,
    description,
    picture,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
    isActive: isActive !== undefined ? isActive : true, // Set default value for isActive
  });

  if (event) {
    res.status(201).json({
      _id: event._id,
      name: event.name,
      description: event.description,
      picture: event.picture,
      startNominationPhase: event.startNominationPhase,
      endNominationPhase: event.endNominationPhase,
      startVotingPhase: event.startVotingPhase,
      endVotingPhase: event.endVotingPhase,
      resultPhase: event.resultPhase,
      isActive: event.isActive, // Include isActive in the response
    });
  } else {
    res.status(400);
    throw new Error("Event creation failed.");
  }
});

module.exports = { createEvent };
