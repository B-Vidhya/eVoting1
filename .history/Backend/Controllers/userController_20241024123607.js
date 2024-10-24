const asyncHandler = require("express-async-handler");
const express = require("express");
const app = express();
const User = require("../Models/LoginModel");
app.use(express.json());

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
      type: user.type, // Return type in response
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// Authenticate user (login)
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      type: user.type, // Include user type
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials or Password");
  }
});

module.exports = { authUser, registerUser };
