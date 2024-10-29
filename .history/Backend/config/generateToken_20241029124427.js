const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, "aspirevote", {
    expiresIn: "1d",
  });
};
module.exports = generateToken;
