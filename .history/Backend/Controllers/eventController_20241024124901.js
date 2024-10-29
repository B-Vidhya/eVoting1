// Nominating a user
const nominateUser = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { studentId } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Check if within nomination phase
  const currentDate = new Date();
  if (
    currentDate < event.startNominationPhase ||
    currentDate > event.endNominationPhase
  ) {
    res.status(400);
    throw new Error("Not in the nomination phase");
  }

  // Check if already nominated
  if (
    event.nominations.some(
      (nomination) => nomination.studentId.toString() === studentId
    )
  ) {
    res.status(400);
    throw new Error("You have already nominated yourself");
  }

  event.nominations.push({ studentId });
  await event.save();
  res.status(200).json({ message: "Nominated successfully" });
});

// Voting function
const voteForUser = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { voterId, voteFor } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Check if within voting phase
  const currentDate = new Date();
  if (
    currentDate < event.startVotingPhase ||
    currentDate > event.endVotingPhase
  ) {
    res.status(400);
    throw new Error("Not in the voting phase");
  }

  event.votes.push({ voterId, voteFor });
  await event.save();
  res.status(200).json({ message: "Vote cast successfully" });
});
