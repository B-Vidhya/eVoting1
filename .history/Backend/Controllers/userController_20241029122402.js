const asyncHandler = require("express-async-handler");
const express = require("express");
const User = require("../Models/LoginModel");
const OTP = require("../Models/OtpModel"); // Import the OTP model
const nodemailer = require("nodemailer"); // Import Nodemailer
const crypto = require("crypto"); // To generate OTPs
const generateToken = require("../Config/generateToken");
const app = express();
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "collegevoting2105@gmail.com", // Your email
    pass: "hqpy rinp dmrl jstq", // Your email password
  },
});

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Create new user
  const user = await User.create({ email, password, type });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      type: user.type,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// Authenticate user (login)
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Validate the user credentials
  if (user && user.password === password) {
    // Generate a random OTP
    const otp = crypto.randomBytes(3).toString("hex"); // Generates a 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP to database
    await OTP.create({ email, otp, expiresAt });

    // Send OTP email
    await transporter.sendMail({
      from: "collegevoting2105@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({
      message: "OTP sent to your email!",
      email: user.email,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials or Password");
  }
});

// Send OTP
const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const otp = crypto.randomBytes(3).toString("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

  await OTP.create({ email, otp, expiresAt });

  await transporter.sendMail({
    from: "collegevoting2105@gmail.com", // Replace with your email
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
  });

  res.status(200).json({ message: "OTP sent!" });
});

// Resend OTP
const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Generate a new OTP
  const otp = crypto.randomBytes(3).toString("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

  await OTP.updateOne({ email }, { otp, expiresAt });

  await transporter.sendMail({
    from: "collegevoting2105@gmail.com", // Replace with your email
    to: email,
    subject: "Your OTP Code",
    text: `Your new OTP code is: ${otp}. It is valid for 10 minutes.`,
  });

  res.status(200).json({ message: "OTP resent!" });
});

// Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  // Check if OTP is expired
  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired." });
  }

  res.status(200).json({
    email: user.email,
    type: user.type,
  });
});

module.exports = {
  authUser,
  registerUser,
  sendOtp,
  resendOtp,
  verifyOtp,
};
