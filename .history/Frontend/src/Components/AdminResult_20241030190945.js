import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/AdminResult.css";

const AdminResultsPage = () => {
  const { eventId } = useParams();
  const [results, setResults] = useState([]);
  const [hoveredCandidate, setHoveredCandidate] = useState(null);

  useEffect(() => {
    // Fetch live results from the backend
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/results/admin/${eventId}`
        );
        console.log("Fetched Results:", response.data); // Log to verify data structure
        setResults(response.data.results || []); // Ensure results is always an array
      } catch (error) {
        console.error("Error fetching live results:", error);
      }
    };

    // Polling every 10 seconds for live updates
    const intervalId = setInterval(fetchResults, 10000);
    fetchResults(); // Initial fetch
    return () => clearInterval(intervalId);
  }, [eventId]);

  const handleMouseEnter = (candidateId) => {
    setHoveredCandidate(candidateId);
  };

  const handleMouseLeave = () => {
    setHoveredCandidate(null);
  };

  const getMaxVotes = (roleCandidates) => {
    return Math.max(
      ...(roleCandidates?.map((candidate) => candidate.votes) || [0])
    );
  };

  return (
    <div className="results-list">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Results List */}
      <Container className="results-container my-5">
        <h2 className="text-center mb-4">Live Election Results</h2>
        {results && results.length > 0 ? (
          results.map((roleData, index) => (
            <div className="role-container" key={index}>
              <h3 className="role-title">{roleData.role}</h3>
              <div className="candidates-container">
                {roleData.candidates?.map((candidate) => (
                  <div
                    className="candidate-box"
                    key={candidate.id}
                    onMouseEnter={() => handleMouseEnter(candidate.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={candidate.photo}
                      alt="Candidate"
                      className="candidate-photo"
                    />
                    <div className="candidate-name">{candidate.name}</div>
                    <div className="candidate-description">
                      {candidate.reason}
                    </div>

                    {hoveredCandidate === candidate.id && (
                      <div className="candidate-extra-details">
                        <p>Roll No: {candidate.rollNo}</p>
                        <p>Class: {candidate.class}</p>
                        <p>Section: {candidate.section}</p>
                      </div>
                    )}

                    <ProgressBar
                      now={
                        (candidate.votes / getMaxVotes(roleData.candidates)) *
                        100
                      }
                      label={`${candidate.votes} votes`}
                      className="candidate-progress-bar"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No results available yet.</p>
        )}
      </Container>
    </div>
  );
};

export default AdminResultsPage;
