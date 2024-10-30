// Routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const { getResultsByEvent } = require("../Controllers/resultController");

// Route to get results by event ID
router.get("/admin/:eventId", getResultsByEvent);
router.get("/user/:eventId", getResultsByEvent);
module.exports = router;
