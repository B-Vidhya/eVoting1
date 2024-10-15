import React from "react";
import { Carousel } from "react-bootstrap";
import FirstImage from "../Images/first.svg"; // Image for nomination phase
import SecondImage from "../Images/second.svg"; // Image for voting phase
import ThirdImage from "../Images/third.svg"; // Image for team collaboration
import Logo from "../Images/AV.jpg";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-section">
          <img src={Logo} alt="Website Logo" className="logo" />
          <h1 className="site-title">AspireVote</h1>
        </div>
        <nav>
          <a href="/signup" className="login-button">Login</a>
        </nav>
      </header>

      {/* Slider Section */}
      <div className="hero">
        <Carousel>
          <Carousel.Item>
            <div className="carousel-content">
              <div className="carousel-text">
                <h3>Candidates Nomination</h3>
                <p>Nominate yourself for various leadership roles in upcoming campus events and lead your community to success.</p>
              </div>
              <img
                className="carousel-image"
                src={FirstImage}
                alt="First slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-content">
              <div className="carousel-text">
                <h3>Voting Process</h3>
                <p>Select and vote for the best candidates who can bring positive change and innovation to your campus.</p>
              </div>
              <img
                className="carousel-image"
                src={SecondImage}
                alt="Second slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-content">
              <div className="carousel-text">
                <h3>Team Collaboration</h3>
                <p>Support your chosen leaders in fostering teamwork and bringing your campus community together.</p>
              </div>
              <img
                className="carousel-image"
                src={ThirdImage}
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Description Section */}
      <div className="content-section">
        <h2>Welcome to the Campus Voting Portal!</h2>
        <p>
          Our platform is designed to facilitate seamless and transparent elections for various campus events and positions. This website enables students to actively participate in the nomination and voting process for key leadership roles in upcoming science, tech, and cultural fests. We aim to ensure fair elections, empowering students to choose representatives who will lead these events successfully.
        </p>
        <h3>How It Works</h3>
        <h4>Nomination Phase:</h4>
        <p>
          Students who are passionate about taking on leadership roles can nominate themselves for various positions such as Convenor, Co-Convenor, Treasurer, Designer, President, Vice President, and more. Simply log in, browse the list of active events, and complete the registration form with your details, such as your picture, the role you're applying for, your CGPA, attendance, and a brief statement on why you believe you are suitable for the position. Your nomination will be reviewed by the admin team, and candidates who meet the criteria will be eligible for the voting phase.
        </p>
        <h4>Voting Phase:</h4>
        <p>
          After the nomination phase, all students will be able to vote for their preferred candidates. You can explore each candidate's profile, which includes their goals and qualifications, and make an informed decision. After casting your vote for a particular role, your voting for that role will be locked to ensure fairness and transparency.
        </p>
        <h4>Result Declaration:</h4>
        <p>
          After the voting phase concludes, the admin will analyze the results and declare the winners for each position. The results will be available for everyone to view, ensuring an open and fair process.
        </p>
        <h4>Key Features:</h4>
        <p>
          User-Friendly Interface: Easy navigation through events, roles, and candidate details. <br />
          Secure Voting System: Every vote is unique and securely processed to prevent any misuse. <br />
          Real-Time Updates: Stay informed with real-time updates on events, candidates, and voting status.
        </p>
        <p>Whether you are a student eager to lead or a voter excited to choose the best candidates, this platform ensures that your voice is heard and valued. Together, let's build a stronger, more engaged campus community!</p>
      </div>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>How do I nominate myself for a position?</h4>
          <p>Log in to the platform, browse the active events, and fill out the nomination form with your details and the position you are interested in. Your application will be reviewed by the admin team.</p>
        </div>
        <div className="faq-item">
          <h4>When can I vote?</h4>
          <p>Voting will begin after the nomination phase is complete. You will be notified of the voting period through the platform, and you can vote for your preferred candidates during this time.</p>
        </div>
        <div className="faq-item">
          <h4>Can I vote for multiple candidates in the same role?</h4>
          <p>No, once you cast your vote for a particular role, your voting for that role will be locked to ensure fairness and transparency.</p>
        </div>
        <div className="faq-item">
          <h4>How are the results announced?</h4>
          <p>After the voting phase concludes, the results will be analyzed by the admin team and declared on the platform. You can view the results to see who won the respective positions.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Email: campusvoting@university.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 University Ave, City, Country</p>
          <p>Follow us on social media for updates and news!</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
