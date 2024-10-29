// // UserResult.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../Styles/UserResult.css';

// const UserResult = () => {
//   const [winners, setWinners] = useState([]);

//   useEffect(() => {
//     // Fetch the final result after voting phase ends
//     axios.get('/api/candidates/finalResults')
//       .then(response => setWinners(response.data))
//       .catch(error => console.error('Error fetching final results:', error));
//   }, []);

//   return (
//     <div className="user-result-page">
//       <header className="header">User - Final Election Results</header>
//       <div className="winner-list">
//         {winners.map(winner => (
//           <div key={winner._id} className="winner-card">
//             <h3>{winner.name}</h3>
//             <p>Role: {winner.role}</p>
//             <p>Email: {winner.email}</p>
//             <p>Votes Received: <span className="vote-count">{winner.voteCount}</span></p>
//           </div>
//         ))}
//       </div>
//       <footer className="footer">Voting System User Results</footer>
//     </div>
//   );
// };

// export default UserResult;



import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../Styles/UserResult.css';

const winningCandidates = [
  {
    id: 1,
    name: 'John Doe',
    role: 'President',
    branch: 'Computer Science',
    section: 'A',
    rollNumber: 'CS101',
    votes: 120,
    photo: 'https://via.placeholder.com/100',
    description: 'Experienced leader with a passion for technology.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Vice President',
    branch: 'Electrical Engineering',
    section: 'B',
    rollNumber: 'EE202',
    votes: 98,
    photo: 'https://via.placeholder.com/100',
    description: 'Advocate for sustainable energy and innovation.',
  },
  {
    id: 3,
    name: 'John Doe',
    role: 'Treasurer',
    branch: 'Computer Science',
    section: 'A',
    rollNumber: 'CS101',
    votes: 120,
    photo: 'https://via.placeholder.com/100',
    description: 'Experienced leader with a passion for technology.',
  },
  {
    id: 4,
    name: 'Jane Smith',
    role: 'Designer',
    branch: 'Electrical Engineering',
    section: 'B',
    rollNumber: 'EE202',
    votes: 98,
    photo: 'https://via.placeholder.com/100',
    description: 'Advocate for sustainable energy and innovation.',
  },
  {
    id: 5,
    name: 'John Doe',
    role: 'Convenor',
    branch: 'Computer Science',
    section: 'A',
    rollNumber: 'CS101',
    votes: 120,
    photo: 'https://via.placeholder.com/100',
    description: 'Experienced leader with a passion for technology.',
  },
  {
    id: 6,
    name: 'Jane Smith',
    role: 'Co-Convenor',
    branch: 'Electrical Engineering',
    section: 'B',
    rollNumber: 'EE202',
    votes: 98,
    photo: 'https://via.placeholder.com/100',
    description: 'Advocate for sustainable energy and innovation.',
  },
  // Add more winning candidates as needed
];

const UserResult = () => {
  return (
    <div className="user-results-page">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">User Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Results */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Final Results</h2>
        {winningCandidates.map((candidate) => (
          <div className="candidate-box" key={candidate.id}>
            <img src={candidate.photo} alt="Candidate" className="candidate-photo" />
            <div className="candidate-info">
              <div className="candidate-name">{candidate.name}</div>
              <div className="candidate-role">Role: {candidate.role}</div>
              <div className="candidate-description">{candidate.description}</div>
              <div className="candidate-vote-count">Votes Received: {candidate.votes}</div>
            </div>
            <div className="candidate-extra-details">
              Roll Number: {candidate.rollNumber}<br />
              {candidate.branch} - Section {candidate.section}
            </div>
          </div>
        ))}
      </Container>

      {/* Footer */}
      <footer className="user-footer">User Panel © 2024</footer>
    </div>
  );
};

export default UserResult;

