const asyncHandler = require("express-async-handler");
const express = require("express");
const app = express();
const User = require("../Models/LoginModel");
app.use(express.json());
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({ email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      //pic: user.pic,
      //token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials or Password");
  }
});
module.exports = { authUser, registerUser };
