import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import axios from "axios"; // Make sure axios is installed
import "../Styles/AdminNominationsList.css";

const AdminNominationsList = () => {
  const { eventId } = useParams(); // Get eventId from URL parameters
  const [nominations, setNominations] = useState([]);
  const [hoveredStudent, setHoveredStudent] = useState(null);

  // Fetch nominations based on the eventId
  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/nominations/pending/${eventId}`
        ); // API call to fetch nominations for the specific event
        setNominations(response.data); // Set nominations to state
      } catch (error) {
        console.error("Error fetching nominations:", error);
      }
    };

    fetchNominations();
  }, [eventId]); // Re-fetch nominations if the eventId changes

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
        }
      ); // API call to update nomination status
      setNominations((prev) =>
        prev.filter((nomination) => nomination._id !== nominationId)
      ); // Remove accepted nomination from state
      alert(`Nomination accepted for ${response.data.name}`);
    } catch (error) {
      console.error("Error accepting nomination:", error);
    }
  };

  const handleReject = async (nominationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/nominations/${nominationId}`,
        {
          status: "Rejected",
        }
      ); // API call to update nomination status
      setNominations((prev) =>
        prev.filter((nomination) => nomination._id !== nominationId)
      ); // Remove rejected nomination from state
      alert(`Nomination rejected for ${response.data.name}`);
    } catch (error) {
      console.error("Error rejecting nomination:", error);
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
            key={student._id} // Use student._id as the key
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
