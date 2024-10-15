
import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import techFestImage from '../Images/techFest.svg';
import scienceFestImage from '../Images/scienceFest.svg';
import culturalFestImage from '../Images/culturalFest.svg';
import Logo from "../Images/AV.jpg";
import '../Styles/EventsList.css';


const nominationStartDate = new Date('2024-08-29'); // Replace with your actual dates
const nominationEndDate = new Date('2024-09-15');
const electionStartDate = new Date('2024-09-29');
const electionEndDate = new Date('2024-09-30');
const resultsDate = new Date('2024-09-29');



const events = [
  { id: 1, name: 'Tech Fest', description: 'Explore the world of technology and innovation.', image: techFestImage, isActive: true },
  { id: 2, name: 'Science Fest', description: 'Delve into the wonders of science and research.', image: scienceFestImage, isActive: false },
  { id: 3, name: 'Cultural Fest', description: 'Celebrate the diversity of culture and arts.', image: culturalFestImage, isActive: false }
];

const EventsListPage = () => {
  const navigate = useNavigate();
  const handleEventClick = (event) => {
    const today = new Date();
    if (event.isActive) {
       if(today >= nominationStartDate && today <= nominationEndDate){
        navigate(`/nomination/${event.id}`);
       }
       else if (today >= electionStartDate && today <= electionEndDate){
        navigate(`/voting/${event.id}`);
       }
       else if (today >= resultsDate){
        navigate("/results");
       }
     } else {
       navigate('/inactive');
     }
   };

  return (
    <>
      {/* Header */}
       <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={Logo}
            alt="AspireVote Logo"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          AspireVote
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          {/* <Nav.Link href="#">About</Nav.Link> */}
          {/* <Nav.Link href="#">Contact</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>

      {/* Events List */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Select an Event</h2>
        <Row>
          {events.map(event => (
            <Col md={4} key={event.id} className="mb-4">
              <Card className="shadow-sm" onClick={() => handleEventClick(event)}>
                <Card.Img variant="top" src={event.image} alt={event.name} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className=" text-white text-center py-3 mt-5">
        <Container>
          <p>&copy; 2024 Campus Voting System. All rights reserved.</p>
          <p>Follow us on:</p>
          <Nav className="justify-content-center">
            <Nav.Link href="#" className="text-white">Facebook</Nav.Link>
            <Nav.Link href="#" className="text-white">Twitter</Nav.Link>
            <Nav.Link href="#" className="text-white">Instagram</Nav.Link>
          </Nav>
        </Container>
      </footer>
    </>
  );
};

export default EventsListPage;
