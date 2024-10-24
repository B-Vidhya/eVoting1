const express = require("express");
const router = express.Router();
const {
  createNomination,
  getPendingNominations,
  updateNominationStatus, // Import the update function
} = require("../Controllers/nominationController"); // Import your controller functions

// POST /api/nominations - Create a new nomination
router.post("/", createNomination);

// GET /api/nominations - Fetch nominations based on event
router.get("/pending/:eventId", getPendingNominations);

// PATCH /api/nominations/:nominationId - Update nomination status
router.patch("/:nominationId", updateNominationStatus); // Add this route

module.exports = router;
