
import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import login from '../Images/login.svg';
import '../Styles/styles.css';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming user login/validation happens here
    navigate('/events');
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <Row className="shadow-lg rounded-lg bg-white overflow-hidden w-100" style={{ maxWidth: '1200px' }}>
        {/* Left Section */}
        <Col lg={6} className="d-flex flex-column justify-content-center align-items-center p-5">
          <h2 className="text-center font-weight-bold mb-4">Sign Up</h2>
          <Form className="w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                className="py-3 shadow-sm bg-light"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="py-3 shadow-sm bg-light"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-4 py-3 shadow-sm d-flex align-items-center justify-content-center"
            >
              <i className="fas fa-user-plus mr-2"></i> Sign Up
            </Button>
          </Form>
        </Col>
        {/* Right Section */}
        <Col lg={6} className="d-none d-lg-flex justify-content-center align-items-center bg-primary text-white">
          <img
            className="m-5"
            src={login}
            alt="Illustration"
            style={{
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '500px',
              width: '100%',
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
