const express = require("express");
const router = express.Router();
const { createEvent } = require("../Controllers/eventController"); // Import the controller

router.route("/").post(createEvent); // Handle POST requests for creating events

module.exports = router;
