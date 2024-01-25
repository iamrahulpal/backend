const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    try {
      // Get token from header
      token = req.cookies.jwt;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }

      next();
    } catch (error) {
      res.status(400).json({
        type: "Error",
        error: error.error || error
      });
    }
  }
  if (!token) {
    res.status(401).json({
      statusCode: "401",
      type: "error",
      data: "No token, Unauthorized User"
    });
  }
};

module.exports = authenticateUser;
