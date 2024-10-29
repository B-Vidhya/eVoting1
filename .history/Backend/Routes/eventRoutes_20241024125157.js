const express = require("express");
const router = express.Router();
const { createEvent } = require("../Controllers/eventController");

router.post("/", createEvent); // Endpoint to create an event

module.exports = router;
