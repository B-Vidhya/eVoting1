const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  sendOtp,
  resendOtp,
  verifyOtp,
} = require("../Controllers/userController");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/send-otp", sendOtp); // Route for sending OTP
router.post("/resend-otp", resendOtp); // Route for resending OTP
router.post("/verify-otp", verifyOtp); // Route for verifying OTP

module.exports = router;
