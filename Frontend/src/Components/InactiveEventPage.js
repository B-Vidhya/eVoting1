import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const InactiveEventPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Event Inactive</h2>
      <p>The event you selected is currently inactive. Please check back later.</p>
      <Button variant="primary" onClick={() => navigate('/events')}>Back to Events</Button>
    </Container>
  );
};

export default InactiveEventPage;
