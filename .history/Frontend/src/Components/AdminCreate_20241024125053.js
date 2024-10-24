import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminCreate.css";

const AdminCreate = () => {
  const navigate = useNavigate();

  // Define state for form fields and submission status
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPicture, setEventPicture] = useState(null);
  const [startNominationPhase, setStartNominationPhase] = useState("");
  const [endNominationPhase, setEndNominationPhase] = useState("");
  const [startVotingPhase, setStartVotingPhase] = useState("");
  const [endVotingPhase, setEndVotingPhase] = useState("");
  const [resultPhase, setResultPhase] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to send
    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("description", eventDescription);
    formData.append("picture", eventPicture); // This should be the file itself
    formData.append("startNominationPhase", startNominationPhase);
    formData.append("endNominationPhase", endNominationPhase);
    formData.append("startVotingPhase", startVotingPhase);
    formData.append("endVotingPhase", endVotingPhase);
    formData.append("resultPhase", resultPhase);

    try {
      const response = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Event created:", response.data);
      setSuccessMessage("Event created successfully!");
      // Clear form fields
      setEventName("");
      setEventDescription("");
      setEventPicture(null);
      setStartNominationPhase("");
      setEndNominationPhase("");
      setStartVotingPhase("");
      setEndVotingPhase("");
      setResultPhase("");

      // Optionally, redirect after a delay or on button click
      setTimeout(() => {
        navigate("/events"); // Redirect to the events page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Failed to create event. Please try again.");
    }
  };

  return (
    <Container className="container d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={8} className="mx-auto my-5">
          <h2 className="text-center">Create Event</h2>

          {/* Display success or error messages */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPicture" className="mt-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setEventPicture(e.target.files[0])}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNominationPhase" className="mt-3">
              <Form.Label>Start Nomination Phase</Form.Label>
              <Form.Control
                type="date"
                value={startNominationPhase}
                onChange={(e) => setStartNominationPhase(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndNominationPhase" className="mt-3">
              <Form.Label>End Nomination Phase</Form.Label>
              <Form.Control
                type="date"
                value={endNominationPhase}
                onChange={(e) => setEndNominationPhase(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartVotingPhase" className="mt-3">
              <Form.Label>Start Voting Phase</Form.Label>
              <Form.Control
                type="date"
                value={startVotingPhase}
                onChange={(e) => setStartVotingPhase(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndVotingPhase" className="mt-3">
              <Form.Label>End Voting Phase</Form.Label>
              <Form.Control
                type="date"
                value={endVotingPhase}
                onChange={(e) => setEndVotingPhase(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formResultPhase" className="mt-3">
              <Form.Label>Result Phase</Form.Label>
              <Form.Control
                type="date"
                value={resultPhase}
                onChange={(e) => setResultPhase(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Create Event
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreate;
