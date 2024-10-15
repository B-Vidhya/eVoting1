
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../Styles/NominationForm.css'; // Importing the CSS file
import nominationBg from '../Images/sejvf.avif'; // Import your background image

const NominationForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="nomination-page" style={{ backgroundImage: `url(${nominationBg})` }}>
      <Container className="my-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="form-container">
            <h2 className="text-center mb-4">NOMINATION FORM</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStudentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" required />
              </Form.Group>

              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" required>
                  <option value="">Select a role...</option>
                  <option value="Convenor">Convenor</option>
                  <option value="Co-Convenor">Co-Convenor</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Designer">Designer</option>
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCGPA" className="mt-3">
                <Form.Label>CGPA</Form.Label>
                <Form.Control type="number" placeholder="Enter your CGPA" step="0.01" required />
              </Form.Group>

              <Form.Group controlId="formAttendance" className="mt-3">
                <Form.Label>Attendance (%)</Form.Label>
                <Form.Control type="number" placeholder="Enter your attendance percentage" required />
              </Form.Group>
              
              {/* Image Upload Section */}
             <Form.Group controlId="formImageUpload" className="image-upload">
               <Form.Label>Upload Your Image</Form.Label>
               <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
             </Form.Group>

              <Form.Group controlId="formReason" className="mt-3">
                <Form.Label>Why do you want this role?</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Explain why you're a good fit for this role" required />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100">
                Submit Nomination
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NominationForm;
