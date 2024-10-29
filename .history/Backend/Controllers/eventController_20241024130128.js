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
    });
  } else {
    res.status(400);
    throw new Error("Event creation failed.");
  }
});

module.exports = { createEvent };
