// controllers/userController.js
const Post = require("../../models/postModel");

class getPost {
  async post() {
    try {
      const posts = await Post.find().sort({"createdAt": -1});
      console.log("🚀 ~ posts:", posts)
      if (!posts) throw "Post doesn't exists";
      return posts;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const instance = new getPost();
      const posts =  await instance.post();
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: posts,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new getPost();
