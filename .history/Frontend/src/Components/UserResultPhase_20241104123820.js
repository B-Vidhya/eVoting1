import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/AdminClick.css";

const UserResultPhase = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Retrieve the eventId from the URL

  // Handlers for buttons
  const handleResultsOverview = () => {
    navigate(`/user/results/${eventId}`);
  };

  const handleFinalResult = () => {
    navigate(`/user/resultfinal/${eventId}`);
  };

  return (
    <>
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="admin-click-bg">
        <Container className="admin-click-container">
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="admin-title">User Dashboard</h2>
              <p className="admin-subtitle">
                Check your Results Overview and Final Results
              </p>
              <div className="button-group">
                <Button
                  onClick={handleResultsOverview}
                  className="btn-nominations"
                >
                  Results Overview
                </Button>
                <Button onClick={handleFinalResult} className="btn-results">
                  Final Results
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Email: collegevoting2105@gmail.com </p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 University Ave, City, Country</p>
        </div>
      </footer>
    </>
  );
};

export default UserResultPhase;
