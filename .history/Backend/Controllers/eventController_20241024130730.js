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
    isActive,
  } = req.body;

  // Check for required fields
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

  // Create a new event
  const newEvent = new Event({
    name,
    description,
    picture,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
    isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
  });

  const savedEvent = await newEvent.save();
  res.status(201).json(savedEvent);
});

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  if (events.length > 0) {
    res.status(200).json(events);
  } else {
    res.status(404);
    throw new Error("No events found");
  }
});

module.exports = { createEvent, getAllEvents };
