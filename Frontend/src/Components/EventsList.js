import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../Images/AV.jpg";
import "../Styles/EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const today = new Date();

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const userType = userInfo?.type || "";
  const token = userInfo?.token;

  useEffect(() => {
    if (!token) {
      navigate("/home");
      return;
    }

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);

        if (error.response && error.response.status === 401) {
          navigate("/home");
        }
      }
    };

    fetchEvents();
  }, [token, navigate]);

  const handleEventClick = (event) => {
    const nominationStartDate = new Date(event.startNominationPhase);
    const nominationEndDate = new Date(event.endNominationPhase);
    const electionStartDate = new Date(event.startVotingPhase);
    const electionEndDate = new Date(event.endVotingPhase);
    const resultsDate = new Date(event.resultPhase);

    if (userType === "admin") {
      navigate(`/admin/events/${event._id}`);
    } else if (event.isActive) {
      if (today >= nominationStartDate && today <= nominationEndDate) {
        navigate(`/nomination/${event._id}`);
      } else if (today >= electionStartDate && today <= electionEndDate) {
        navigate(`/voting/${event._id}`);
      } else if (today >= resultsDate) {
        navigate(`/user/eventClick/${event._id}`);
      } else {
        navigate("/inactive");
      }
    }
  };

  const handleCreateEvent = () => {
    navigate("/admin/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    navigate("/home");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getEventPhase = (event) => {
    const nominationStartDate = new Date(event.startNominationPhase);
    const nominationEndDate = new Date(event.endNominationPhase);
    const electionStartDate = new Date(event.startVotingPhase);
    const electionEndDate = new Date(event.endVotingPhase);
    const resultsDate = new Date(event.resultPhase);

    if (today >= nominationStartDate && today <= nominationEndDate) {
      return "Nomination Phase is active";
    } else if (today >= electionStartDate && today <= electionEndDate) {
      return "Voting Phase is active";
    } else if (today >= resultsDate) {
      return "Result Phase is active";
    }
    return "Inactive Phase";
  };

  return (
    <>
      {/* Header */}
      <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <div className="logo-section">
              <img src={Logo} alt="Website Logo" className="logo" />
              <h1 className="site-title">AspireVote</h1>
            </div>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {userType === "admin" && (
        <Container className="mt-3">
          <Button
            variant="primary"
            onClick={handleCreateEvent}
            className="mb-4 align-left"
          >
            Create Event
          </Button>
        </Container>
      )}
      
      

      {/* Events List */}
      <Container className="mt-5 events-container">
  <h2 className="text-center mb-4">Select an Event</h2>
  <Row>
    {events.length > 0 ? (
      events.map((event) => (
        <Col md={4} key={event._id} className="mb-4">
          <Card
            className="shadow-sm"
            onClick={() => handleEventClick(event)}
          >
            <Card.Img
              variant="top"
              src={event.picture}
              alt={event.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <div className="event-phase">{getEventPhase(event)}</div>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))
    ) : (
      <p>No events available at the moment.</p>
    )}
  </Row>
</Container>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Email: collegevoting2105@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 University Ave, City, Country</p>
        </div>
      </footer>
    </>
  );
};

export default EventsList;
