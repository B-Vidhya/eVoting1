import React, { useState } from 'react';

const AdminViewCandidates = () => {
  const [candidates, setCandidates] = useState([
    { name: 'Alice', cgpa: 9.1, attendance: 85 },
    { name: 'Bob', cgpa: 7.8, attendance: 65 },
    { name: 'Charlie', cgpa: 8.3, attendance: 80 },
    // Add more candidates here
  ]);

  const filterCandidates = () => {
    const filteredCandidates = candidates.filter(
      candidate => candidate.cgpa >= 8 && candidate.attendance >= 75
    );
    setCandidates(filteredCandidates);
  };

  return (
    <div className="candidates-list">
      <h2>Candidates List</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            {candidate.name} - CGPA: {candidate.cgpa}, Attendance: {candidate.attendance}%
          </li>
        ))}
      </ul>
      <button onClick={filterCandidates}>Filter</button>
    </div>
  );
};

export default AdminViewCandidates;
