import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminCreate.css";
import { useToast } from "@chakra-ui/react";

const AdminCreate = () => {
  const navigate = useNavigate();

  // Define state for form fields
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [pic, setPic] = useState(null);
  const [startNominationPhase, setStartNominationPhase] = useState("");
  const [endNominationPhase, setEndNominationPhase] = useState("");
  const [startVotingPhase, setStartVotingPhase] = useState("");
  const [endVotingPhase, setEndVotingPhase] = useState("");
  const [resultPhase, setResultPhase] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Function to handle image upload to Cloudinary
  const postDetails = async (pics) => {
    setLoading(true);
    if (!pics) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dumugkpxd");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dumugkpxd/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await res.json();
        setPic(imageData.url);
      } catch (err) {
        console.log(err);
        toast({
          title: "Image upload failed!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      toast({
        title: "Please select an image in JPEG or PNG format!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve token from local storage for authorization
    const token = localStorage.getItem("token");

    const eventData = {
      name: eventName,
      description: eventDescription,
      picture: pic,
      startNominationPhase,
      endNominationPhase,
      startVotingPhase,
      endVotingPhase,
      resultPhase,
      isActive,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        }
      );

      console.log("Event created:", response.data);
      navigate("/events"); // Redirect to events page on success
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "Failed to create event!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    setLoading(false);
  };

  return (
    <Container className="container d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={8} className="mx-auto my-5">
          <h2 className="text-center">Create Event</h2>
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
                onChange={(e) => postDetails(e.target.files[0])}
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
            <Form.Group controlId="formIsActive" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-100"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Create Event"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreate;
