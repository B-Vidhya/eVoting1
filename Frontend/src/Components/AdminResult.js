// // AdminResult.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../Styles/AdminResult.css';

// const AdminResult = () => {
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Function to fetch the live vote count from the backend
//     const fetchLiveVotes = () => {
//       axios.get('/api/candidates/liveVotes')
//         .then(response => setCandidates(response.data))
//         .catch(error => console.error('Error fetching live vote count:', error));
//     };

//     // Initial fetch
//     fetchLiveVotes();

//     // Polling every 5 seconds
//     const interval = setInterval(fetchLiveVotes, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-result-page">
//       <header className="header">Admin - Live Vote Count</header>
//       <div className="candidate-list">
//         {candidates.map(candidate => (
//           <div key={candidate._id} className="candidate-card">
//             <h3>{candidate.name}</h3>
//             <p>Role: {candidate.role}</p>
//             <p>Email: {candidate.email}</p>
//             <p>Votes Received: <span className="vote-count">{candidate.voteCount}</span></p>
//           </div>
//         ))}
//       </div>
//       <footer className="footer">Voting System Admin Results</footer>
//     </div>
//   );
// };

// export default AdminResult;




import React, { useState } from 'react';
import { Container, Navbar, Nav, ProgressBar } from 'react-bootstrap';
import '../Styles/AdminResult.css';

const dummyResults = [
  {
    role: 'Convenor',
    candidates: [
      {
        id: 1,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 2,
        name: 'Alice Johnson',
        rollNo: 'CS102',
        class: 'Computer Science',
        section: 'B',
        photo: 'https://via.placeholder.com/100',
        description: 'Focused on enhancing student welfare and activities.',
        votes: 65,
      },
      {
        id: 1,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 2,
        name: 'Alice Johnson',
        rollNo: 'CS102',
        class: 'Computer Science',
        section: 'B',
        photo: 'https://via.placeholder.com/100',
        description: 'Focused on enhancing student welfare and activities.',
        votes: 65,
      },
      {
        id: 3,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 4,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 5,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 6,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 7,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
      {
        id: 8,
        name: 'John Doe',
        rollNo: 'CS101',
        class: 'Computer Science',
        section: 'A',
        photo: 'https://via.placeholder.com/100',
        description: 'Passionate about leadership and innovation in tech.',
        votes: 85,
      },
    ],
  },
  {
    role: 'Co-Convenor',
    candidates: [
        {
            id: 1,
            name: 'Jane Smith',
            rollNo: 'EE201',
            class: 'Electrical Engineering',
            section: 'C',
            photo: 'https://via.placeholder.com/100',
            description: 'Dedicated to promoting innovation and sustainability.',
            votes: 75,
          },
          {
            id: 2,
            name: 'Bob Brown',
            rollNo: 'EE202',
            class: 'Electrical Engineering',
            section: 'D',
            photo: 'https://via.placeholder.com/100',
            description: 'Aims to create more student-centered initiatives.',
            votes: 50,
          },
      {
        id: 3,
        name: 'Jane Smith',
        rollNo: 'EE201',
        class: 'Electrical Engineering',
        section: 'C',
        photo: 'https://via.placeholder.com/100',
        description: 'Dedicated to promoting innovation and sustainability.',
        votes: 75,
      },
      {
        id: 4,
        name: 'Bob Brown',
        rollNo: 'EE202',
        class: 'Electrical Engineering',
        section: 'D',
        photo: 'https://via.placeholder.com/100',
        description: 'Aims to create more student-centered initiatives.',
        votes: 50,
      },
    ],
  },
  {
    role: 'Treasurer',
    candidates: [
        {
            id: 1,
            name: 'Jane Smith',
            rollNo: 'EE201',
            class: 'Electrical Engineering',
            section: 'C',
            photo: 'https://via.placeholder.com/100',
            description: 'Dedicated to promoting innovation and sustainability.',
            votes: 75,
          },
          {
            id: 2,
            name: 'Bob Brown',
            rollNo: 'EE202',
            class: 'Electrical Engineering',
            section: 'D',
            photo: 'https://via.placeholder.com/100',
            description: 'Aims to create more student-centered initiatives.',
            votes: 50,
          },
      {
        id: 3,
        name: 'Jane Smith',
        rollNo: 'EE201',
        class: 'Electrical Engineering',
        section: 'C',
        photo: 'https://via.placeholder.com/100',
        description: 'Dedicated to promoting innovation and sustainability.',
        votes: 75,
      },
      {
        id: 4,
        name: 'Bob Brown',
        rollNo: 'EE202',
        class: 'Electrical Engineering',
        section: 'D',
        photo: 'https://via.placeholder.com/100',
        description: 'Aims to create more student-centered initiatives.',
        votes: 50,
      },
    ],
  },
  {
    role: 'Designer',
    candidates: [
        {
            id: 1,
            name: 'Jane Smith',
            rollNo: 'EE201',
            class: 'Electrical Engineering',
            section: 'C',
            photo: 'https://via.placeholder.com/100',
            description: 'Dedicated to promoting innovation and sustainability.',
            votes: 75,
          },
          {
            id: 2,
            name: 'Bob Brown',
            rollNo: 'EE202',
            class: 'Electrical Engineering',
            section: 'D',
            photo: 'https://via.placeholder.com/100',
            description: 'Aims to create more student-centered initiatives.',
            votes: 50,
          },
      {
        id: 3,
        name: 'Jane Smith',
        rollNo: 'EE201',
        class: 'Electrical Engineering',
        section: 'C',
        photo: 'https://via.placeholder.com/100',
        description: 'Dedicated to promoting innovation and sustainability.',
        votes: 75,
      },
      {
        id: 4,
        name: 'Bob Brown',
        rollNo: 'EE202',
        class: 'Electrical Engineering',
        section: 'D',
        photo: 'https://via.placeholder.com/100',
        description: 'Aims to create more student-centered initiatives.',
        votes: 50,
      },
    ],
  },
  {
    role: 'President',
    candidates: [
        {
            id: 1,
            name: 'Jane Smith',
            rollNo: 'EE201',
            class: 'Electrical Engineering',
            section: 'C',
            photo: 'https://via.placeholder.com/100',
            description: 'Dedicated to promoting innovation and sustainability.',
            votes: 75,
          },
          {
            id: 2,
            name: 'Bob Brown',
            rollNo: 'EE202',
            class: 'Electrical Engineering',
            section: 'D',
            photo: 'https://via.placeholder.com/100',
            description: 'Aims to create more student-centered initiatives.',
            votes: 50,
          },
      {
        id: 3,
        name: 'Jane Smith',
        rollNo: 'EE201',
        class: 'Electrical Engineering',
        section: 'C',
        photo: 'https://via.placeholder.com/100',
        description: 'Dedicated to promoting innovation and sustainability.',
        votes: 75,
      },
      {
        id: 4,
        name: 'Bob Brown',
        rollNo: 'EE202',
        class: 'Electrical Engineering',
        section: 'D',
        photo: 'https://via.placeholder.com/100',
        description: 'Aims to create more student-centered initiatives.',
        votes: 50,
      },
    ],
  },
  {
    role: 'Vice President',
    candidates: [
        {
            id: 1,
            name: 'Jane Smith',
            rollNo: 'EE201',
            class: 'Electrical Engineering',
            section: 'C',
            photo: 'https://via.placeholder.com/100',
            description: 'Dedicated to promoting innovation and sustainability.',
            votes: 75,
          },
          {
            id: 2,
            name: 'Bob Brown',
            rollNo: 'EE202',
            class: 'Electrical Engineering',
            section: 'D',
            photo: 'https://via.placeholder.com/100',
            description: 'Aims to create more student-centered initiatives.',
            votes: 50,
          },
      {
        id: 3,
        name: 'Jane Smith',
        rollNo: 'EE201',
        class: 'Electrical Engineering',
        section: 'C',
        photo: 'https://via.placeholder.com/100',
        description: 'Dedicated to promoting innovation and sustainability.',
        votes: 75,
      },
      {
        id: 4,
        name: 'Bob Brown',
        rollNo: 'EE202',
        class: 'Electrical Engineering',
        section: 'D',
        photo: 'https://via.placeholder.com/100',
        description: 'Aims to create more student-centered initiatives.',
        votes: 50,
      },
    ],
  },
  // Add more roles as needed
];

const AdminResultsPage = () => {
  const [hoveredCandidate, setHoveredCandidate] = useState(null);

  const handleMouseEnter = (candidateId) => {
    setHoveredCandidate(candidateId);
  };

  const handleMouseLeave = () => {
    setHoveredCandidate(null);
  };

  const getMaxVotes = () => {
    return Math.max(
      ...dummyResults.flatMap(roleData => roleData.candidates.map(candidate => candidate.votes))
    );
  };

  return (
    <div className="results-list">
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

      {/* Results List */}
      <Container className="results-container my-5">
        <h2 className="text-center mb-4">Election Results</h2>
        {dummyResults.map((roleData) => (
          <div className="role-container" key={roleData.role}>
            <h3 className="role-title">{roleData.role}</h3>
            <div className="candidates-container">
              {roleData.candidates.map((candidate) => (
                <div
                  className="candidate-box"
                  key={candidate.id}
                  onMouseEnter={() => handleMouseEnter(candidate.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={candidate.photo} alt="Candidate" className="candidate-photo" />
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-description">{candidate.description}</div>

                  {hoveredCandidate === candidate.id && (
                    <div className="candidate-extra-details">
                      <p>Roll No: {candidate.rollNo}</p>
                      <p>Class: {candidate.class}</p>
                      <p>Section: {candidate.section}</p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <ProgressBar
                    now={(candidate.votes / getMaxVotes()) * 100}
                    label={`${candidate.votes} votes`}
                    className="candidate-vote-bar"
                  />
                </div>
              ))}
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

export default AdminResultsPage;
