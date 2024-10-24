const asyncHandler = require("express-async-handler");
const Event = require("../Models/EventModel");
const path = require("path");

// Function to handle event creation
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
  } = req.body;

  // Handling file upload (make sure to set up multer or any file upload handling middleware)
  const picture = req.file ? req.file.path : ""; // Assuming you're using multer to handle file uploads

  if (
    !name ||
    !description ||
    !startNominationPhase ||
    !endNominationPhase ||
    !startVotingPhase ||
    !endVotingPhase ||
    !resultPhase
  ) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Create a new event
  const event = new Event({
    name,
    description,
    picture,
    startNominationPhase,
    endNominationPhase,
    startVotingPhase,
    endVotingPhase,
    resultPhase,
  });

  const createdEvent = await event.save();

  res.status(201).json(createdEvent); // Respond with the created event
});

module.exports = { createEvent };
