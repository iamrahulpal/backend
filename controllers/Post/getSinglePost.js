// controllers/userController.js
const Post = require("../../models/postModel");

class getPost {
  async process(req, res) {
    try {
      let id = req.params.id;
      const post = await Post.find({ _id: id });
      if (post.length == 0) {
        console.log("not post");
        throw "Post not found.";
      }
      res.status(200).json({
        type: "Success",
        data: post,
      });
    } catch (error) {
      res.status(400).json({
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new getPost();
