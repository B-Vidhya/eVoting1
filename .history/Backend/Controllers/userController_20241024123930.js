const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Models/LoginModel");

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, type } = req.body; // Optional type can be provided
  console.log(email, password);

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user (with hashed password and default user type)
  const user = await User.create({
    email,
    password: hashedPassword,
    type: type || "user", // Default user type is 'user'
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      type: user.type, // Include user type in response
      // Optionally, you can add a token or other fields here
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      type: user.type, // Include user type in response
      // Optionally, add a token here if using JWT
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials or password");
  }
});

module.exports = { authUser, registerUser };
