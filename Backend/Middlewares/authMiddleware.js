// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../Models/LoginModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultSecret"
      ); // Use the same secret key

      // Attach user info (excluding password) to the request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        // Check if user is found
        return res.status(404).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = protect;
