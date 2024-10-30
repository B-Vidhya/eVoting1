// controllers/resultController.js
const Nomination = require("../models/Nomination");

// Get results by event
const getResultsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find all nominations for the event and sort them by vote count
    const results = await Nomination.find({ eventId, status: "Accepted" })
      .sort({ votes: -1 }) // Sort in descending order of votes
      .select("name role votes"); // Select fields to include in the results

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No nominations found for this event" });
    }

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
};

module.exports = { getResultsByEvent };
