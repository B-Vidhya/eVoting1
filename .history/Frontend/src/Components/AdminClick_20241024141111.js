//import Time from './Components/Time'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";
import EventsList from "./Components/EventsList";
import NominationForm from "./Components/NominationForm";
import AdminViewCandidates from "./Components/AdminViewCandidates";
import VotingPage from "./Components/VotingPage";
import ResultPage from "./Components/ResultPage";
import InactiveEventPage from "./Components/InactiveEventPage"; // Add this for inactive events
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
          {/* SignUpPage Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          {/* Student and Admin Home Pages */}
          <Route path="/home" element={<Home userType="student" />} />
          <Route path="/admin/home" element={<Home userType="admin" />} />
          {/* Event List */}
          <Route path="/events" element={<EventsList />} />
          {/* Nomination Form */}
          <Route path="/nomination/:eventId" element={<NominationForm />} />
          <Route path="/user-login" element={<UserLoginPage />} />{" "}
          {/* UserLoginPage route */}
          {/* Admin-specific Routes */}
          <Route path="/admin/candidates" element={<AdminViewCandidates />} />
          {/* Admin routes */}
          <Route path="/admin/events/:eventId" element={<AdminClick />} />
          <Route
            path="/admin/nominations/:eventId"
            element={<AdminNominationsList />}
          />
          {/* <Route path="/admin/results" element={<AdminResults/>} /> */}
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

export default App;     // import React from 'react';
// import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const AdminClick = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Header */}
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="#">Campus Voting System - Admin</Navbar.Brand>
//           <Nav className="ml-auto">
//             <Nav.Link href="#">Home</Nav.Link>
//             <Nav.Link href="#">About</Nav.Link>
//             <Nav.Link href="#">Contact</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Main Body */}
//       <Container className="mt-5">
//         <h2 className="text-center mb-4">Admin Actions</h2>
//         <Row className="justify-content-center">
//           <Col md={6} className="text-center mb-3">
//             <Button
//               variant="primary"
//               className="w-100"
//               onClick={() => navigate('/admin/nominations')}
//             >
//               View Nominations List
//             </Button>
//           </Col>
//           <Col md={6} className="text-center">
//             <Button
//               variant="success"
//               className="w-100"
//               onClick={() => navigate('/admin/results')}
//             >
//               View Results
//             </Button>
//           </Col>
//         </Row>
//       </Container>

//       {/* Footer */}
//       <footer className="bg-dark text-white text-center py-3 mt-5">
//         <Container>
//           <p>&copy; 2024 Campus Voting System. All rights reserved.</p>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default AdminClick;
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../Styles/AdminClick.css";

const AdminClick = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  return (
    <div className="admin-container">
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

      {/* Main content */}
      <div className="admin-content">
        <h2 className="text-center mt-4">Manage Event</h2>
        <div className="admin-buttons">
          <buttonn
            className="admin-button"
            onClick={() => navigate(`/admin/nominations/${eventId}`)}
            //onClick={() => navigate("/admin/nominations/:")}
          >
            Nominations List
          </buttonn>
          <button
            className="admin-button"
            //onClick={() => navigate(`/admin/results/${eventId}`)}
            onClick={() => navigate("/admin/results")}
          >
            Result List
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="admin-footer">Admin Panel © 2024</footer>
    </div>
  );
};

export default AdminClick;