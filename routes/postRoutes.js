// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth.middleware");

router.get(
  "/",
  authenticateUser,
  require("../controllers/Post/getPost").process
);

module.exports = router;
