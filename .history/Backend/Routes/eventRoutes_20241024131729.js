const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController");

// Route to create a new event (existing code)
router.post("/", createEvent);

// Route to get all events (newly added code)
router.get("/", getEvents);

module.exports = router;
