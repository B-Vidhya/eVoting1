import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Axios for API calls
import { Container, Navbar, Nav } from "react-bootstrap";
import "../Styles/AdminNominationsList.css";

const AdminNominationsList = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [nominations, setNominations] = useState([]); // State to hold nominations
  const [hoveredStudent, setHoveredStudent] = useState(null);

  // Fetch nominations from the backend corresponding to the current event
  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await axios.get(`/api/nominations/pending/${eventId}`); // Use eventId in the API call
        setNominations(response.data); // Set nominations to state
      } catch (error) {
        console.error("Error fetching nominations:", error);
      }
    };

    fetchNominations();
  }, [eventId]); // Add eventId as a dependency to re-fetch if it changes

  // Handle Accept button click
  const handleAccept = async (nominationId) => {
    try {
      await axios.put(`/api/nominations/${nominationId}/accept`); // Update with your actual API endpoint
      setNominations(
        nominations.filter((nomination) => nomination._id !== nominationId)
      ); // Remove accepted nomination from the list
    } catch (error) {
      console.error("Error accepting nomination:", error);
    }
  };

  // Handle Reject button click
  const handleReject = async (nominationId) => {
    try {
      await axios.put(`/api/nominations/${nominationId}/reject`); // Update with your actual API endpoint
      setNominations(
        nominations.filter((nomination) => nomination._id !== nominationId)
      ); // Remove rejected nomination from the list
    } catch (error) {
      console.error("Error rejecting nomination:", error);
    }
  };

  const handleMouseEnter = (studentId) => {
    setHoveredStudent(studentId);
  };

  const handleMouseLeave = () => {
    setHoveredStudent(null);
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
        <h2 className="text-center mb-4">
          Nominations List for Event ID: {eventId}
        </h2>
        {nominations.length === 0 ? (
          <p className="text-center">
            No nominations available for this event.
          </p>
        ) : (
          nominations.map((student) => (
            <div
              className="nomination-container"
              key={student._id} // Use _id from the backend
              onMouseEnter={() => handleMouseEnter(student._id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={student.image}
                alt="Student"
                className="student-image"
              />
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
                  onClick={() => handleAccept(student._id)} // Call handleAccept on click
                >
                  Accept
                </button>
                <button
                  className="action-button reject-button"
                  onClick={() => handleReject(student._id)} // Call handleReject on click
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </Container>

      {/* Footer */}
      <footer className="admin-footer">Admin Panel © 2024</footer>
    </div>
  );
};

export default AdminNominationsList;
