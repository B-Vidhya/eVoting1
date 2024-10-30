// Routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const { getResultsByEvent } = require("../Controllers/resultController");

// Route to get results by event ID
router.get("/:eventId", getResultsByEvent);

module.exports = router;
