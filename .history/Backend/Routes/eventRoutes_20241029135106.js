const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../Controllers/eventController");
const protect = require("../Middlewares/authMiddleware"); // Import auth middleware

// Route to create a new event with authorization
router.post("/", protect, createEvent);

// Route to get all events with authorization
router.get("/", protect, getEvents);

module.exports = router;
