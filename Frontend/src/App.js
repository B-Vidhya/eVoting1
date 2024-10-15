//import Time from './Components/Time'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './Components/SignUpPage';
import Home from './Components/Home';
import EventsList from './Components/EventsList';
import NominationForm from './Components/NominationForm';
import AdminViewCandidates from './Components/AdminViewCandidates';
import VotingPage from './Components/VotingPage';
import ResultPage from './Components/ResultPage';
import InactiveEventPage from './Components/InactiveEventPage'; // Add this for inactive events

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Home />} />

          {/* SignUpPage Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Student and Admin Home Pages */}
          <Route path="/home" element={<Home userType="student" />} />
          <Route path="/admin/home" element={<Home userType="admin" />} />
          
          {/* Event List */}
          <Route path="/events" element={<EventsList />} />
          
          {/* Nomination Form */}
          <Route path="/nomination/:eventId" element={<NominationForm />} />
          

          {/* Admin-specific Routes */}
          <Route path="/admin/candidates" element={<AdminViewCandidates />} />
          
          {/* Voting and Result Pages */}
          <Route path="/voting/:eventId" element={<VotingPage />} />
          <Route path="/results" element={<ResultPage />} />
          
          {/* Inactive Event Page */}
          <Route path="/inactive" element={<InactiveEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
