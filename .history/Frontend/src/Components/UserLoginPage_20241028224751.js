import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import login from "../Images/login.svg";
import "../Styles/styles.css";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSendOTP = async () => {
    if (!email) {
      toast({
        title: "Please enter your email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/user/send-otp", { email });
      setOtpSent(true);
      toast({
        title: "OTP Sent!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      startResendTimer(); // Start the resend timer
    } catch (error) {
      toast({
        title: "Error sending OTP",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) {
      toast({
        title: "Please wait before resending OTP",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/user/resend-otp", { email });
      toast({
        title: "OTP Resent!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      startResendTimer(); // Start the resend timer
    } catch (error) {
      toast({
        title: "Error resending OTP",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      toast({
        title: "Please enter all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/verify-otp",
        { email, otp }
      );
      toast({
        title: "Login Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("adminInfo", JSON.stringify(data));
      navigate("/events");
    } catch (error) {
      toast({
        title: "Invalid OTP",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    setTimer(30); // Set to 30 seconds for demo; adjust as necessary
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      setResendDisabled(false);
      setTimer(0);
    };
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Row
        className="shadow-lg rounded-lg bg-white overflow-hidden w-100"
        style={{ maxWidth: "1200px" }}
      >
        <Col
          lg={6}
          className="d-flex flex-column justify-content-center align-items-center p-5"
        >
          <h2 className="text-center font-weight-bold mb-4">User Login</h2>
          <Form
            className="w-100"
            style={{ maxWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                className="py-3 shadow-sm bg-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {!otpSent && (
              <Button
                variant="primary"
                className="w-100 mt-4 py-3 shadow-sm"
                isLoading={loading}
                onClick={handleSendOTP}
                style={{ backgroundColor: "#6c4ccf" }}
              >
                Send OTP
              </Button>
            )}

            {otpSent && (
              <>
                <Form.Group controlId="formOTP" className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your OTP"
                    className="py-3 shadow-sm bg-light"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4 py-3 shadow-sm"
                  isLoading={loading}
                  style={{ backgroundColor: "#6c4ccf" }}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  className="w-100 mt-3 py-3 shadow-sm"
                  onClick={handleResendOTP}
                  disabled={resendDisabled} // Disable when timer is active
                  style={{ backgroundColor: "#6c4ccf" }}
                >
                  {resendDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
                </Button>
              </>
            )}
          </Form>
        </Col>

        <Col
          lg={6}
          className="d-none d-lg-flex justify-content-center align-items-center bg-primary text-white"
        >
          <img
            className="m-5"
            src={login}
            alt="Illustration"
            style={{
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "500px",
              width: "100%",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserLoginPage;

// import React, { useState } from "react";
// import { Container, Row, Col, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import login from "../Images/login.svg";
// import "../Styles/styles.css";
// import { useToast } from "@chakra-ui/react";
// import { Button } from "@chakra-ui/react";
// import axios from "axios";

// const UserLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false); // OTP field visibility
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();

//   const handleSendOTP = async () => {
//     if (!email) {
//       toast({
//         title: "Please enter your email",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       // Simulating OTP sending process
//       setTimeout(() => {
//         setOtpSent(true); // Show OTP input field
//         toast({
//           title: "OTP Sent!",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//           position: "top",
//         });
//         setLoading(false);
//       }, 2000); // Simulate a 2-second delay for sending OTP

//     } catch (error) {
//       toast({
//         title: "Error sending OTP",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       // Simulating OTP resend process
//       setTimeout(() => {
//         toast({
//           title: "OTP Resent!",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//           position: "top",
//         });
//         setLoading(false);
//       }, 2000); // Simulate a 2-second delay for resending OTP

//     } catch (error) {
//       toast({
//         title: "Error resending OTP",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !otp) {
//       toast({
//         title: "Please enter all fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/admin/login", { email, otp });
//       toast({
//         title: "Login Successful!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       localStorage.setItem("adminInfo", JSON.stringify(data));
//       navigate("/admin-dashboard");
//     } catch (error) {
//       toast({
//         title: "Invalid OTP",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//     }
//   };

//   return (
//     <Container
//       fluid
//       className="d-flex justify-content-center align-items-center bg-light"
//       style={{ minHeight: "100vh" }}
//     >
//       <Row
//         className="shadow-lg rounded-lg bg-white overflow-hidden w-100"
//         style={{ maxWidth: "1200px" }}
//       >
//         {/* Left Section */}
//         <Col
//           lg={6}
//           className="d-flex flex-column justify-content-center align-items-center p-5"
//         >
//           <h2 className="text-center font-weight-bold mb-4">User Login</h2>
//           <Form
//             className="w-100"
//             style={{ maxWidth: "400px" }}
//             onSubmit={handleSubmit}
//           >
//             <Form.Group controlId="formEmail">
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 className="py-3 shadow-sm bg-light"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>

//             {!otpSent && (
//               <Button
//                 variant="primary"
//                 className="w-100 mt-4 py-3 shadow-sm"
//                 isLoading={loading}
//                 onClick={handleSendOTP}
//                 style={{ backgroundColor: "#6c4ccf" }}
//               >
//                 Send OTP
//               </Button>
//             )}

//             {otpSent && (
//               <>
//                 <Form.Group controlId="formOTP" className="mt-3">
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your OTP"
//                     className="py-3 shadow-sm bg-light"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 mt-4 py-3 shadow-sm"
//                   isLoading={loading}
//                   style={{ backgroundColor: "#6c4ccf" }}
//                 >
//                   Login
//                 </Button>

//                 <Button
//                   variant="primary"
//                   className="w-100 mt-3 py-3 shadow-sm"
//                   onClick={handleResendOTP}
//                   style={{ backgroundColor: "#6c4ccf" }}
//                 >
//                   Resend OTP
//                 </Button>
//               </>
//             )}
//           </Form>
//         </Col>

//         {/* Right Section */}
//         <Col
//           lg={6}
//           className="d-none d-lg-flex justify-content-center align-items-center bg-primary text-white"
//         >
//           <img
//             className="m-5"
//             src={login}
//             alt="Illustration"
//             style={{
//               backgroundSize: "contain",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//               height: "500px",
//               width: "100%",
//             }}
//           />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserLoginPage;
