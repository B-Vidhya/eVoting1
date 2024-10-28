const Nomination = require("../Models/NominationModel"); // Import your nomination model

// Controller to create a new nomination
const createNomination = async (req, res) => {
  try {
    const nominationData = req.body;
    const newNomination = new Nomination(nominationData);
    await newNomination.save();
    res.status(201).json(newNomination);
  } catch (error) {
    console.error("Error creating nomination:", error);
    res.status(500).json({ message: "Error creating nomination" });
  }
};

// Controller to fetch nominations based on eventId
const getNominations = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const nominations = await Nomination.find({
      eventId,
      status: "Pending",
    });
    res.status(200).json(nominations);
  } catch (error) {
    console.error("Error fetching nominations:", error);
    res.status(500).json({ message: "Error fetching nominations" });
  }
};

// Controller to update nomination status
const updateNominationStatus = async (req, res) => {
  try {
    const { nominationId } = req.params;
    const { status } = req.body;
    const updatedNomination = await Nomination.findByIdAndUpdate(
      nominationId,
      { status },
      { new: true }
    );
    if (!updatedNomination) {
      return res.status(404).json({ message: "Nomination not found" });
    }
    res.status(200).json(updatedNomination);
  } catch (error) {
    console.error("Error updating nomination status:", error);
    res.status(500).json({ message: "Error updating nomination status" });
  }
};

// Controller to fetch accepted nominations based on eventId
const getAcceptedNominations = async (req, res) => {
  try {
    const eventId = req.params.eventId.trim();
    const nominations = await Nomination.find({
      eventId,
      status: "Accepted",
    });
    res.status(200).json(nominations);
  } catch (error) {
    console.error("Error fetching accepted nominations:", error);
    res.status(500).json({ message: "Error fetching accepted nominations" });
  }
};

// Controller to submit votes for accepted nominations
const submitVotes = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { selectedStudent } = req.body;

    // Iterate over each role and update the selected student's nomination
    for (const [role, studentId] of Object.entries(selectedStudent)) {
      await Nomination.findByIdAndUpdate(
        studentId,
        { $inc: { votes: 1 } }, // Increment the vote count for the selected student
        { new: true }
      );
    }

    res.status(200).json({ message: "Votes submitted successfully" });
  } catch (error) {
    console.error("Error submitting votes:", error);
    res.status(500).json({ message: "Error submitting votes" });
  }
};

module.exports = {
  createNomination,
  getNominations,
  updateNominationStatus,
  getAcceptedNominations,
  submitVotes, // Export the new submitVotes controller
};
