import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";
import EventsList from "./Components/EventsList";
import NominationForm from "./Components/NominationForm";
import AdminViewCandidates from "./Components/AdminViewCandidates";
import VotingPage from "./Components/VotingPage";
import ResultPage from "./Components/ResultPage";
import InactiveEventPage from "./Components/InactiveEventPage";
import AdminClick from "./Components/AdminClick";
import AdminNominationsList from "./Components/AdminNominationsList";
import AdminCreate from "./Components/AdminCreate";
import UserLoginPage from "./Components/UserLoginPage";
import VotingPhase from "./Components/VotingPhase";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home userType="student" />} />
          <Route path="/admin/home" element={<Home userType="admin" />} />
          <Route path="/events" element={<EventsList />} />

          {/* Nomination Form */}
          <Route path="/nomination/:eventId" element={<NominationForm />} />
          <Route path="/user-login" element={<UserLoginPage />} />

          {/* Admin-specific Routes */}
          <Route path="/admin/candidates" element={<AdminViewCandidates />} />
          <Route path="/admin/events/:eventId" element={<AdminClick />} />
          <Route
            path="/admin/nominations/:eventId"
            element={<AdminNominationsList />}
          />
          <Route path="/admin/create" element={<AdminCreate />} />

          {/* Voting and Result Pages */}
          <Route path="/voting/:eventId" element={<VotingPhase />} />
          <Route path="/results" element={<ResultPage />} />

          {/* Inactive Event Page */}
          <Route path="/inactive" element={<InactiveEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
