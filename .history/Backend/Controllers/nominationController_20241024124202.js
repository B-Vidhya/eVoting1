const Nomination = require("../Models/NominationModel"); // Import your nomination model

// Controller to create a new nomination
const createNomination = async (req, res) => {
  try {
    const nominationData = req.body; // Get the nomination data from the request body
    const newNomination = new Nomination(nominationData); // Create a new instance of the Nomination model
    await newNomination.save(); // Save the nomination to the database
    res.status(201).json(newNomination); // Respond with the saved nomination
  } catch (error) {
    console.error("Error creating nomination:", error);
    res.status(500).json({ message: "Error creating nomination" });
  }
};

// Controller to fetch nominations based on eventId
const getNominations = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Get the eventId from the URL parameters
    const nominations = await Nomination.find({ eventId }); // Fetch nominations for the specific event
    res.status(200).json(nominations); // Respond with the list of nominations
  } catch (error) {
    console.error("Error fetching nominations:", error);
    res.status(500).json({ message: "Error fetching nominations" });
  }
};

module.exports = { createNomination, getNominations };
