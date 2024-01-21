// routes/userRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/Post/getPost").process);




module.exports = router;
