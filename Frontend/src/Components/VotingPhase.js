import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import '../Styles/VotingPhase.css';

const dummyStudents = {
  Convenor: [
    {
      id: 1,
      name: 'John Doe',
      branch: 'Computer Science',
      section: 'A',
      description: 'John is a passionate leader with experience in project management.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Jane Smith',
      branch: 'Electrical Engineering',
      section: 'B',
      description: 'Jane has a strong background in team leadership and event organization.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'John Doe',
      branch: 'Computer Science',
      section: 'A',
      description: 'John is a passionate leader with experience in project management.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Jane Smith',
      branch: 'Electrical Engineering',
      section: 'B',
      description: 'Jane has a strong background in team leadership and event organization.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
  CoConvenor: [
    {
      id: 3,
      name: 'Emily Johnson',
      branch: 'Mechanical Engineering',
      section: 'C',
      description: 'Emily excels in teamwork and creative solutions.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      name: 'Michael Brown',
      branch: 'Civil Engineering',
      section: 'D',
      description: 'Michael is dedicated to innovation in construction.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
  Treasurer: [
    {
      id: 5,
      name: 'Emma Wilson',
      branch: 'Biotechnology',
      section: 'E',
      description: 'Emma has strong analytical and budgeting skills.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 6,
      name: 'Liam Garcia',
      branch: 'Information Technology',
      section: 'F',
      description: 'Liam is tech-savvy with excellent financial management.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
  Designer: [
    {
      id: 7,
      name: 'Sophia Martinez',
      branch: 'Graphic Design',
      section: 'G',
      description: 'Sophia is an artistic designer with a keen eye for detail.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 8,
      name: 'James Rodriguez',
      branch: 'Fashion Design',
      section: 'H',
      description: 'James specializes in creative and trendy designs.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
  President: [
    {
      id: 9,
      name: 'Charlotte Lee',
      branch: 'Political Science',
      section: 'I',
      description: 'Charlotte is an influential leader with public speaking skills.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 10,
      name: 'Benjamin Walker',
      branch: 'Business Administration',
      section: 'J',
      description: 'Benjamin has experience in managing teams effectively.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
  VicePresident: [
    {
      id: 11,
      name: 'Ava Hall',
      branch: 'Communication Studies',
      section: 'K',
      description: 'Ava is skilled in conflict resolution and mediation.',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 12,
      name: 'Lucas Young',
      branch: 'Economics',
      section: 'L',
      description: 'Lucas is knowledgeable in financial strategies and policies.',
      image: 'https://via.placeholder.com/100',
    },
    // Add more students as needed
  ],
};

const VotingPhase = () => {
  const [selectedStudent, setSelectedStudent] = useState({});

  const handleCheckboxChange = (role, studentId) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [role]: prev[role] === studentId ? null : studentId,
    }));
  };

  const clearSelection = (role) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [role]: null,
    }));
  };

  const handleSubmit = () => {
    // Handle submission logic here (e.g., sending data to backend)
    console.log("Selected Students:", selectedStudent);
    alert("Votes submitted successfully!");
  };

  return (
    <div className="voting-phase">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Voting Phase</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5">
        {Object.keys(dummyStudents).map((role) => (
          <div key={role} className="role-container">
            <h3>{role}</h3>
            {dummyStudents[role].map((student) => (
              <div className="student-container" key={student.id}>
                <img src={student.image} alt="Student" className="student-image" />
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-details">
                    {student.branch} - Section {student.section}
                  </div>
                  <div className="student-description">{student.description}</div>
                </div>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedStudent[role] === student.id}
                    onChange={() => handleCheckboxChange(role, student.id)}
                    className="styled-checkbox"
                  />
                  <span className={`checkmark ${selectedStudent[role] === student.id ? 'checked' : ''}`}></span>
                </label>
              </div>
            ))}
            <Button className="clear-button" onClick={() => clearSelection(role)}>
              Clear
            </Button>
          </div>
        ))}
        {/* Submit Button */}
        <div className="submit-container">
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Container>

      <footer className="footer">
        Voting System © 2024
      </footer>
    </div>
  );
};

export default VotingPhase;
