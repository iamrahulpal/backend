const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class registerUser {
  async checkUser(email, username) {
    try {
      let isUser = await User.findOne({ $or: [{ email }, { username }] });
      if (isUser) throw "Email or Username already exists";
      return;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {

      const { firstName, lastName, username, email, password } = req.body;

      const isUser = await this.checkUser(email, username);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });

      if (!newUser) throw "Failed to register";
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        type: "Success",
        data: token,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error)
      res.status(400).json({
        type: "Error",
        error: error.error || error,
      });
    }
  };
}

module.exports = new registerUser();