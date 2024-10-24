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
  } = req.body;

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

  const createEvent = async (req, res) => {
  const { name, description, picture, startNominationPhase, endNominationPhase, startVotingPhase, endVotingPhase, resultPhase, isActive } = req.body;

  try {
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
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};
// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  if (events) {
    res.status(200).json(events);
  } else {
    res.status(404);
    throw new Error("No events found");
  }
});
module.exports = { createEvent, getAllEvents };
