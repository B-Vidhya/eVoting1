import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminCreate.css'; // Import your CSS file

const AdminCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <Container className="container d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={8} className="mx-auto my-5">
          <h2 className="text-center">Create Event</h2>
          <Form onSubmit={handleSubmit}>
            {/* Form Fields Here */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter event name" required />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter event description" required />
            </Form.Group>
            <Form.Group controlId="formPicture" className="mt-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            {/* Date Pickers for Nomination and Voting Phases */}
            <Form.Group controlId="formNominationPhase" className="mt-3">
              <Form.Label>Start Nomination Phase</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group controlId="formEndNominationPhase" className="mt-3">
              <Form.Label>End Nomination Phase</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group controlId="formStartVotingPhase" className="mt-3">
              <Form.Label>Start Voting Phase</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group controlId="formEndVotingPhase" className="mt-3">
              <Form.Label>End Voting Phase</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group controlId="formResultPhase" className="mt-3">
              <Form.Label>Result Phase</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Create Event
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Footer */}
      {/* <footer>
        <p>&copy; 2024 Campus Voting System. All rights reserved.</p>
      </footer> */}
    </Container>
  );
};

export default AdminCreate;
