import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";
import EventsList from "./Components/EventsList";
import NominationForm from "./Components/NominationForm";
import AdminViewCandidates from "./Components/AdminViewCandidates";
import VotingPage from "./Components/VotingPage"; // Not used in routes; consider removing
import InactiveEventPage from "./Components/InactiveEventPage"; // Add this for inactive events
import AdminClick from "./Components/AdminClick";
import AdminNominationsList from "./Components/AdminNominationsList";
import AdminCreate from "./Components/AdminCreate";
import UserLoginPage from "./Components/UserLoginPage";
import VotingPhase from "./Components/VotingPhase";
import AdminResult from "./Components/AdminResult";
import UserResult from "./Components/UserResult"; // Not used in routes; consider removing

function App() {
  useEffect(() => {
    // Check local storage when the app loads
    const storedData = localStorage.getItem("userinfo");
    console.log("Stored User Info:", storedData); // Debugging line to see what is stored

    // Clean up logic should be managed carefully; avoid clearing on navigation
    const handleTabClose = () => {
      // Uncomment to clear only when the tab is closed
      // localStorage.clear();
    };

    // Add event listener for beforeunload if you need to handle tab close
    window.addEventListener("beforeunload", handleTabClose);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []); // This runs once when the component mounts

  return (
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

        {/* Admin Result page */}
        <Route path="/admin/results" element={<AdminResult />} />

        {/* User Result page */}
        <Route path="/user/results" element={<UserResult />} />

        {/* Voting and Result Pages */}
        <Route path="/voting/:eventId" element={<VotingPhase />} />

        {/* Inactive Event Page */}
        <Route path="/inactive" element={<InactiveEventPage />} />
      </Routes>
    </div>
  );
}

export default App;
