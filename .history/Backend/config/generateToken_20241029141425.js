// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // Use environment variable
    expiresIn: "1d",
  });
};

module.exports = generateToken;
