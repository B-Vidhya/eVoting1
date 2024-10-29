import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../Styles/AdminCreate.css"; // Import your CSS file
import { useToast } from "@chakra-ui/react";

const AdminCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Define state for form fields
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startNominationPhase, setStartNominationPhase] = useState("");
  const [endNominationPhase, setEndNominationPhase] = useState("");
  const [startVotingPhase, setStartVotingPhase] = useState("");
  const [endVotingPhase, setEndVotingPhase] = useState("");
  const [resultPhase, setResultPhase] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();

  const postDetails = (pics) => {
    setLoading(true);

    if (!pics) {
      showToast("Please check an image!", "warning");
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dumugkpxd");

      fetch("https://api.cloudinary.com/v1_1/dumugkpxd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          showToast("Failed to upload image!", "error");
          setLoading(false);
        });
    } else {
      showToast("Please select a JPEG or PNG image!", "warning");
      setLoading(false);
    }
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to send
    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("description", eventDescription);
    formData.append("picture", pic); // This should be the file itself
    formData.append("startNominationPhase", startNominationPhase);
    formData.append("endNominationPhase", endNominationPhase);
    formData.append("startVotingPhase", startVotingPhase);
    formData.append("endVotingPhase", endVotingPhase);
    formData.append("resultPhase", resultPhase);

    try {
      setLoading(true); // Set loading state when submitting
      const response = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Event created:", response.data);
      showToast("Event created successfully!", "success");
      navigate("/events"); // Adjust based on your routing
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      showToast(
        error.response?.data?.message || "Error occurred while creating event.",
        "error"
      );
    } finally {
      setLoading(false); // Reset loading state after submission
    }
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
            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-100"
              disabled={loading}
            >
              {loading ? "Creating Event..." : "Create Event"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreate;
