import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast
import "../Styles/AdminResult.css";

const AdminResultsPage = () => {
  const { eventId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userinfo")); // Retrieve userinfo object
        const token = userInfo?.token; // Extract the token

        if (!token) {
          toast.error("User not authorized. Please log in."); // Show toast message for no token
          return; // Exit the function early
        }

        const response = await axios.get(
          `http://localhost:5000/api/results/admin/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );

        console.log("Fetched Results:", response.data); // Log results for verification
        setResults(response.data.results || []); // Update state with results
      } catch (error) {
        console.error("Error fetching live results:", error);
        toast.error("Error fetching live results. Please try again."); // Show toast message for errors
      }
    };

    const intervalId = setInterval(fetchResults, 10000); // Poll every 10 seconds
    fetchResults(); // Initial fetch
    return () => clearInterval(intervalId);
  }, [eventId]);

  const getMaxVotes = () => {
    return Math.max(...(results.map((candidate) => candidate.votes) || [0]));
  };

  return (
    <div className="results-list">
      {/* Toast Container */}
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
        {results.length > 0 ? (
          results.map((candidate) => (
            <div className="candidate-box" key={candidate._id}>
              <img
                src={candidate.image || "default_image_url"}
                alt={`${candidate.name}`}
                className="candidate-image"
              />
              <h3>{candidate.role}</h3>
              <div className="candidate-name">{candidate.name}</div>

              <ProgressBar
                now={(candidate.votes / getMaxVotes()) * 100}
                label={`${candidate.votes} votes`}
                className="candidate-progress-bar"
              />
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
