class Logout {
  async process(req, res) {
    try {
      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //1 day
        secure: true,
        sameSite: "none"
      };
      res.cookie("jwt", "", options);
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "Logout"
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Logout();
