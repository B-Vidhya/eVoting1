import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserResult.css";

const UserResult = () => {
  const [highestVoteCandidates, setHighestVoteCandidates] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const eventId = "YOUR_EVENT_ID"; // Replace with the actual event ID you want to fetch results for
        const response = await axios.get(`/api/results/${eventId}`); // Update with your API endpoint
        const results = response.data.results;

        processHighestVoteCandidates(results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const processHighestVoteCandidates = (candidates) => {
    const roleMap = {};

    // Iterate through the results and find the highest voted candidate per role
    candidates.forEach((candidate) => {
      const { role } = candidate;

      // If the role doesn't exist in the map or the current candidate has more votes
      if (!roleMap[role]) {
        roleMap[role] = candidate; // Add to the map
      }
    });

    // Get the highest vote candidates as an array
    setHighestVoteCandidates(Object.values(roleMap));
  };

  return (
    <div className="user-results-page">
      <h1>Election Results</h1>
      <div className="winner-list">
        {highestVoteCandidates.map((candidate) => (
          <div key={candidate._id} className="candidate-box">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="candidate-photo"
            />
            <div className="candidate-info">
              <div className="candidate-name">{candidate.name}</div>
              <div className="candidate-role">{candidate.role}</div>
              <div className="candidate-vote-count">
                Votes: {candidate.votes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserResult;
