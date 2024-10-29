import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "../Styles/AdminNominationsList.css";

const AdminNominationsList = () => {
  const { eventId } = useParams();
  const [nominations, setNominations] = useState([]);
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // User authentication and type check logic
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  if (!userInfo) {
    navigate("/home"); // Redirect to home if no user info
    return; // Early return to prevent further execution
  }
  const userType = userInfo?.type || ""; // Get user type (admin or user)
  console.log(userType); // Log the user type for debugging
  const token = userInfo.token; // Retrieve token from local storage

  // Fetch nominations based on the eventId
  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nominations/pending/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );
        setNominations(response.data);
      } catch (error) {
        console.error("Error fetching nominations:", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login page
        }
      }
    };

    fetchNominations();
  }, [eventId, navigate, token]);

  const handleMouseEnter = (studentId) => {
    setHoveredStudent(studentId);
  };

  const handleMouseLeave = () => {
    setHoveredStudent(null);
  };

  const handleAccept = async (nominationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/nominations/${nominationId}`,
        {
          status: "Accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      setNominations((prev) =>
        prev.filter((nomination) => nomination._id !== nominationId)
      );
      alert(`Nomination accepted for ${response.data.name}`);
    } catch (error) {
      console.error("Error accepting nomination:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login page
      }
    }
  };

  const handleReject = async (nominationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/nominations/${nominationId}`,
        {
          status: "Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      setNominations((prev) =>
        prev.filter((nomination) => nomination._id !== nominationId)
      );
      alert(`Nomination rejected for ${response.data.name}`);
    } catch (error) {
      console.error("Error rejecting nomination:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login page
      }
    }
  };

  return (
    <div className="nomination-list">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Nominations list */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Nominations List</h2>
        {nominations.map((student) => (
          <div
            className="nomination-container"
            key={student._id}
            onMouseEnter={() => handleMouseEnter(student._id)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={student.image} alt="Student" className="student-image" />
            <div className="student-info">
              <div className="student-name">{student.name}</div>
              <div className="student-role">Role: {student.role}</div>
              <div className="student-details">
                {student.branch} - Section {student.section}
              </div>
              <div className="student-details">Phone: {student.phone}</div>

              {hoveredStudent === student._id && (
                <div className="student-extra-details">
                  <div>{student.description}</div>
                  <div>CGPA: {student.cgpa}</div>
                  <div>Attendance: {student.attendance}</div>
                </div>
              )}
            </div>
            <div className="action-buttons">
              <button
                className="action-button accept-button"
                onClick={() => handleAccept(student._id)}
              >
                Accept
              </button>
              <button
                className="action-button reject-button"
                onClick={() => handleReject(student._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </Container>

      {/* Footer */}
      <footer className="admin-footer">Admin Panel © 2024</footer>
    </div>
  );
};

export default AdminNominationsList;
