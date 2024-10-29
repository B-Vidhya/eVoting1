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
    const nominations = await Nomination.find({
      eventId,
      status: "Pending", // Filter for only pending nominations
    });
    res.status(200).json(nominations); // Respond with the list of pending nominations
  } catch (error) {
    console.error("Error fetching nominations:", error);
    res.status(500).json({ message: "Error fetching nominations" });
  }
};

// Controller to update nomination status
const updateNominationStatus = async (req, res) => {
  try {
    const { nominationId } = req.params; // Get nominationId from the URL parameters
    const { status } = req.body; // Get the new status from the request body
    const updatedNomination = await Nomination.findByIdAndUpdate(
      nominationId,
      { status },
      { new: true } // Return the updated document
    );
    if (!updatedNomination) {
      return res.status(404).json({ message: "Nomination not found" });
    }
    res.status(200).json(updatedNomination); // Respond with the updated nomination
  } catch (error) {
    console.error("Error updating nomination status:", error);
    res.status(500).json({ message: "Error updating nomination status" });
  }
};
// Controller to fetch accepted nominations based on eventId
const getAcceptedNominations = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Get the eventId from the URL parameters
    const nominations = await Nomination.find({
      eventId,
      status: "Accepted", // Filter for only accepted nominations
    });
    res.status(200).json(nominations); // Respond with the list of accepted nominations
  } catch (error) {
    console.error("Error fetching accepted nominations:", error);
    res.status(500).json({ message: "Error fetching accepted nominations" });
  }
};

module.exports = { createNomination, getNominations, updateNominationStatus };
