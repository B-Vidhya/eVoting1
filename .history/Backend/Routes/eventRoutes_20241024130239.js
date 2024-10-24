const express = require("express");
const { createEvent, getAllEvents } = require("../Controllers/eventController");
const router = express.Router();

// POST: Create an event
router.post("/events", createEvent);

// GET: Retrieve all events
router.get("/events", getAllEvents);

module.exports = router;
