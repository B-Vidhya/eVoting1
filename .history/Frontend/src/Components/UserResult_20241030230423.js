import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/UserResult.css";

const UserResult = () => {
  const [winners, setWinners] = useState([]);
  const { eventId } = useParams();

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
          `http://localhost:5000/api/results/user/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWinners(response.data.results);
      } catch (error) {
        console.error("Error fetching final results:", error);
        toast.error("Error fetching final results. Please try again.");
      }
    };

    fetchResults();
  }, [eventId]);

  return (
    <div className="user-results-page">
      <ToastContainer />

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

      <footer className="user-footer">User Panel © 2024</footer>
    </div>
  );
};

export default UserResult;
