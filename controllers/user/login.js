const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class loginUser {
  async checkUser(email, username) {
    try {
      let isUser = await User.findOne({ $or: [{ email }, { username }] });
      if (!isUser) throw "Email or Username is invalid";
      return isUser;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      let user = await this.checkUser(email, username);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw "password does not match";

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      const options = {
        httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //1 day
            secure: true,
            sameSite:'none'
      };
      res.cookie("jwt", token, options);
      res.status(201).json({
        type: "Success",
        data: "logged in"
      });
    } catch (error) {
      res.status(400).json({
        type: "Error",
        error: error.error || error
      });
    }
  };
}

module.exports = new loginUser();
