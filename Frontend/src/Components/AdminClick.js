import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/AdminClick.css";

const AdminClick = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Retrieve the eventId from the URL

  // Handlers for buttons
  const handleNominationsClick = () => {
    navigate(`/admin/nominations/${eventId}`); // Navigate to nominations with eventId
  };

  const handleResultsClick = () => {
    navigate('/admin/results');
  };

  const handleActiveClick = () => {
    console.log("Event marked as Active");
    // Logic to mark event as active can be added here
  };

  const handleInactiveClick = () => {
    console.log("Event marked as Inactive");
    // Logic to mark event as inactive can be added here
  };

  return (
    <>
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Campus Voting System - Admin</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="admin-click-container">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="admin-title">Admin Dashboard</h2>
            <div className="button-group">
              <Button onClick={handleNominationsClick} className="btn-custom">
                Nominations List
              </Button>
              <Button onClick={handleResultsClick} className="btn-custom">
                Results
              </Button>
              <Button
                onClick={handleActiveClick}
                className="btn-custom active-btn"
              >
                Active
              </Button>
              <Button
                onClick={handleInactiveClick}
                className="btn-custom inactive-btn"
              >
                Inactive
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer-purple text-white text-center py-3">
        <Container>
          <p>&copy; 2024 Campus Voting System. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default AdminClick;
