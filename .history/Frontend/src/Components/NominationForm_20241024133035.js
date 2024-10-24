import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import "../Styles/NominationForm.css"; // Importing the CSS file
import nominationBg from "../Images/sejvf.avif"; // Import your background image

const NominationForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate(); // To redirect after successful submission
  const [loading, setLoading] = useState(false); // Loading state
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    cgpa: "",
    attendance: "",
    reason: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, image: file });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role
    ) {
      toast.warn("Please fill in all the required fields.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true); // Set loading to true

    // Convert formData to JSON
    const jsonData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      cgpa: formData.cgpa,
      attendance: formData.attendance,
      reason: formData.reason,
      image: imagePreview, // Send the base64 image or URL if stored
      eventId: eventId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/nominations",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false); // Set loading to false

      toast.success("Nomination submitted successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });

      // Redirect to the events page after 3 seconds
      setTimeout(() => {
        navigate("/events"); // Assuming you have an events page route
      }, 3000);
    } catch (error) {
      setLoading(false); // Set loading to false
      toast.error("Error submitting nomination. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.error("Error submitting nomination:", error);
    }
  };

  return (
    <div
      className="nomination-page"
      style={{ backgroundImage: `url(${nominationBg})` }}
    >
      <ToastContainer /> {/* Toast container for displaying messages */}
      <Container className="my-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="form-container">
            <h2 className="text-center mb-4">NOMINATION FORM</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStudentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  required
                  onChange={handleChange}
                >
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
                <Form.Control
                  type="number"
                  name="cgpa"
                  placeholder="Enter your CGPA"
                  step="0.01"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAttendance" className="mt-3">
                <Form.Label>Attendance (%)</Form.Label>
                <Form.Control
                  type="number"
                  name="attendance"
                  placeholder="Enter your attendance percentage"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Image Upload Section */}
              <Form.Group controlId="formImageUpload" className="image-upload">
                <Form.Label>Upload Your Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formReason" className="mt-3">
                <Form.Label>Why do you want this role?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="reason"
                  placeholder="Explain why you're a good fit for this role"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Submitting..." : "Submit Nomination"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NominationForm;
