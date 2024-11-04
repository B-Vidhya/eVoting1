import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "../Styles/VotingPhase.css";

const VotingPhase = () => {
  const [acceptedNominations, setAcceptedNominations] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Fetch accepted nominations on component mount
  useEffect(() => {
    const fetchAcceptedNominations = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userinfo")); // Retrieve user info from local storage
        if (!userInfo) {
          navigate("/home"); // Redirect to home if userInfo is null
          return;
        }

        const token = userInfo.token; // Get token from userInfo

        const response = await axios.get(
          `http://localhost:5000/api/nominations/accepted/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
          }
        );
        console.log(response.data);
        const nominationsByRole = response.data.reduce((acc, nomination) => {
          const role = nomination.role;
          if (!acc[role]) acc[role] = [];
          acc[role].push(nomination);
          return acc;
        }, {});
        setAcceptedNominations(nominationsByRole);

        // Check if the user has already voted
        const userId = userInfo._id; // Get userId from userInfo
        console.log(userId);
      } catch (error) {
        console.error("Error fetching accepted nominations:", error);
        //toast.error("Failed to fetch accepted nominations.");
      }
    };
    fetchAcceptedNominations();
  }, [eventId, navigate]); // Added navigate to dependencies

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

  const handleSubmit = async () => {
    if (hasVoted) {
      toast.error("You have already voted in this event.");
      return;
    }

    // Check if at least one candidate is selected for each role
    for (const role in acceptedNominations) {
      if (!selectedStudent[role]) {
        toast.error(`Please select at least one candidate for ${role}.`);
        return; // Prevent submission if any role is not selected
      }
    }

    // Confirm submission with the user
    if (!window.confirm("Are you sure you want to submit your votes?")) {
      return;
    }

    try {
      // Retrieve user info from local storage
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      if (!userInfo) {
        navigate("/home"); // Redirect to home if userInfo is null
        return;
      }

      const userId = userInfo._id; // Get userId from userInfo
      const token = userInfo.token; // Get token from userInfo

      await axios.post(
        `http://localhost:5000/api/nominations/submit-votes/${eventId}`,
        { selectedStudent, userId }, // Include userId in the request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
        }
      );

      toast.success("You have successfully voted!"); // Toast message for successful voting

      // Redirect to events page after 5 seconds
      setTimeout(() => {
        navigate("/events");
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error("Error submitting votes:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // Show specific error message
      } else {
        toast.error("Failed to submit votes.");
      }
    }
  };

  return (
    <div className="voting-phase">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Voting Phase</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-5">
        {Object.keys(acceptedNominations).map((role) => (
          <div key={role} className="role-container">
            <h3>{role}</h3>
            {acceptedNominations[role].map((student) => (
              <div className="student-container" key={student._id}>
                <img
                  src={student.image}
                  alt="Student"
                  className="student-image"
                />
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-details">
                    {student.branch} - Section {student.section}
                  </div>
                  <div className="student-description">
                    {student.description}
                  </div>
                </div>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedStudent[role] === student._id}
                    onChange={() => handleCheckboxChange(role, student._id)}
                    className="styled-checkbox"
                  />
                  <span
                    className={`checkmark ${
                      selectedStudent[role] === student._id ? "checked" : ""
                    }`}
                  ></span>
                </label>
              </div>
            ))}
            <Button
              className="clear-button"
              onClick={() => clearSelection(role)}
            >
              Clear
            </Button>
          </div>
        ))}
        <div className="submit-container">
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Container>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Email: collegevoting2105@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 University Ave, City, Country</p>
         
        </div>
      </footer>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default VotingPhase;
