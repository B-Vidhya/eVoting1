
import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../Styles/AdminNominationsList.css';

const dummyNominations = [
  {
    id: 1,
    name: 'John Doe',
    branch: 'Computer Science',
    section: 'A',
    phone: '1234567890',
    image: 'https://via.placeholder.com/100',
    description: 'John is passionate about AI and Robotics.',
    cgpa: '9.0',
    attendance: '95%',
    role: 'President' // New role field
  },
  {
    id: 2,
    name: 'Jane Smith',
    branch: 'Electrical Engineering',
    section: 'B',
    phone: '0987654321',
    image: 'https://via.placeholder.com/100',
    description: 'Jane is interested in sustainable energy and innovation.',
    cgpa: '8.5',
    attendance: '92%',
    role: 'Vice President' // New role field
  }
];

const AdminNominationsList = () => {
  const [hoveredStudent, setHoveredStudent] = useState(null);

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
        <h2 className="text-center mb-4">Nominations List</h2>
        {dummyNominations.map((student) => (
          <div
            className="nomination-container"
            key={student.id}
            onMouseEnter={() => handleMouseEnter(student.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={student.image} alt="Student" className="student-image" />
            <div className="student-info">
              <div className="student-name">{student.name}</div>
              <div className="student-role">Role: {student.role}</div> {/* Display the role */}
              <div className="student-details">
                {student.branch} - Section {student.section}
              </div>
              <div className="student-details">Phone: {student.phone}</div>

              {hoveredStudent === student.id && (
                <div className="student-extra-details">
                  <div>{student.description}</div>
                  <div>CGPA: {student.cgpa}</div>
                  <div>Attendance: {student.attendance}</div>
                </div>
              )}
            </div>
            <div className="action-buttons">
              <button className="action-button accept-button">Accept</button>
              <button className="action-button reject-button">Reject</button>
            </div>
          </div>
        ))}
      </Container>

      {/* Footer */}
      <footer className="admin-footer">
        Admin Panel © 2024
      </footer>
    </div>
  );
};

export default AdminNominationsList;
