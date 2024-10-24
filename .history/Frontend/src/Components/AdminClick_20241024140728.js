import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../Styles/AdminClick.css";

const AdminClick = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Extract eventId from the URL

  // Debugging: Check if eventId is properly retrieved
  console.log("Event ID:", eventId);

  return (
    <div className="admin-container">
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

      {/* Main content */}
      <div className="admin-content">
        <h2 className="text-center mt-4">Manage Event</h2>
        <div className="admin-buttons">
          {/* Navigate to the nominations list */}
          <button
            className="admin-button"
            onClick={() => navigate(`/admin/nominations/${eventId}`)}
          >
            Nominations List
          </button>

          {/* Navigate to the result list */}
          <button
            className="admin-button"
            onClick={() => navigate(`/admin/results/${eventId}`)}
          >
            Result List
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="admin-footer">Admin Panel © 2024</footer>
    </div>
  );
};

export default AdminClick;
