const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const jwtOptions = {
  expiresIn: "1d",
};

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, jwtOptions);
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};
