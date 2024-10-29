// import React from 'react';
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
