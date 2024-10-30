import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast
import "../Styles/UserResult.css";

const UserResult = () => {
  const [winners, setWinners] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    // Fetch the final result after voting phase ends
    const fetchResults = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userinfo")); // Retrieve userinfo object
        const token = userInfo?.token; // Extract the token

        if (!token) {
          toast.error("User not authorized. Please log in."); // Show toast message for no token
          return; // Exit the function early
        }

        const response = await axios.get(
          `http://localhost:5000/api/results/user/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
        setWinners(response.data.results);
      } catch (error) {
        console.error("Error fetching final results:", error);
        toast.error("Error fetching final results. Please try again."); // Show toast message for errors
      }
    };

    fetchResults();
  }, [eventId]);

  return (
    <div className="user-results-page">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">User Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Results */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Final Results</h2>
        {winners.length > 0 ? (
          winners.map((candidate) => (
            <div className="candidate-box" key={candidate._id}>
              <img
                src={candidate.image}
                alt="Candidate"
                className="candidate-photo"
              />
              <div className="candidate-info">
                <div className="candidate-name">{candidate.name}</div>
                <div className="candidate-role">Role: {candidate.role}</div>
                <div className="candidate-vote-count">
                  Votes Received: {candidate.votes}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No results available.</div>
        )}
      </Container>

      {/* Footer */}
      <footer className="user-footer">User Panel © 2024</footer>
    </div>
  );
};

export default UserResult;
