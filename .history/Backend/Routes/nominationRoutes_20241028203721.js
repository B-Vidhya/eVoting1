const express = require("express");
const router = express.Router();
const {
  createNomination,
  getNominations,
  updateNominationStatus,
  getAcceptedNominations,
  submitVotes, // Import the submitVotes function
} = require("../Controllers/nominationController"); // Import your controller functions

// POST /api/nominations - Create a new nomination
router.post("/", createNomination);

// GET /api/nominations/accepted/:eventId - Fetch accepted nominations based on event
router.get("/accepted/:eventId", getAcceptedNominations);

// GET /api/nominations/pending/:eventId - Fetch nominations based on event (Pending only)
router.get("/pending/:eventId", getNominations);

// PATCH /api/nominations/:nominationId - Update nomination status
router.patch("/:nominationId", updateNominationStatus);

// POST /api/nominations/submit-votes/:eventId - Submit votes for a specific event
router.post("/submit-votes/:eventId", submitVotes);
// POST /api/nominations/check-voted/:eventId/:userId - Check if user has voted
router.get("/check-voted/:eventId/:userId", checkIfVoted);

module.exports = router;
