const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/authMiddleware"); // Import the protect middleware
const {
  createNomination,
  getNominations,
  updateNominationStatus,
  getAcceptedNominations,
  submitVotes,
} = require("../Controllers/nominationController");

// POST /api/nominations - Create a new nomination (protected)
router.post("/", protect, createNomination);

// GET /api/nominations/accepted/:eventId - Fetch accepted nominations based on event (protected)
router.get("/accepted/:eventId", protect, getAcceptedNominations);

// GET /api/nominations/pending/:eventId - Fetch pending nominations based on event (protected)
router.get("/pending/:eventId", protect, getNominations);

// PATCH /api/nominations/:nominationId - Update nomination status (protected)
router.patch("/:nominationId", protect, updateNominationStatus);

// POST /api/nominations/submit-votes/:eventId - Submit votes for a specific event (protected)
router.post("/submit-votes/:eventId", protect, submitVotes);

module.exports = router;
