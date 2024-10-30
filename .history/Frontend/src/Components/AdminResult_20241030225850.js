import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AdminResult.css";

const AdminResultsPage = () => {
  const { eventId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userinfo"));
        const token = userInfo?.token;

        if (!token) {
          toast.error("User not authorized. Please log in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/results/admin/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched Results:", response.data);
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Error fetching live results:", error);
        toast.error("Error fetching live results. Please try again.");
      }
    };

    const intervalId = setInterval(fetchResults, 10000);
    fetchResults();
    return () => clearInterval(intervalId);
  }, [eventId]);

  const getMaxVotes = () => {
    return Math.max(...(results.map((candidate) => candidate.votes) || [0]));
  };

  // Group candidates by their roles
  const groupedResults = results.reduce((acc, candidate) => {
    const { role } = candidate;
    if (!acc[role]) acc[role] = [];
    acc[role].push(candidate);
    return acc;
  }, {});

  return (
    <div className="results-list">
      <ToastContainer />

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

      <Container className="results-container my-5">
        <h2 className="text-center mb-4">Live Election Results</h2>

        {Object.keys(groupedResults).length > 0 ? (
          Object.entries(groupedResults).map(([role, candidates]) => (
            <div className="role-container" key={role}>
              <h3 className="role-title">{role}</h3>
              <div className="candidates-container">
                {candidates.map((candidate) => (
                  <div className="candidate-box" key={candidate._id}>
                    <img
                      src={candidate.image || "default_image_url"}
                      alt={`${candidate.name}`}
                      className="candidate-photo"
                    />
                    <div className="candidate-name">{candidate.name}</div>
                    <ProgressBar
                      now={(candidate.votes / getMaxVotes()) * 100}
                      label={`${candidate.votes} votes`}
                      className="candidate-vote-bar"
                    />
                    <div className="candidate-extra-details">
                      {candidate.description || "No additional details"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No results available yet.</p>
        )}
      </Container>

      <footer className="admin-footer">
        <p>Admin Panel © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminResultsPage;
