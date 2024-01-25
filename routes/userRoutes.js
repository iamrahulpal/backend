const express = require("express");
const router = express.Router();

router.post("/signup", require("../controllers/user/signup").process); // Register User
router.post("/login", require("../controllers/user/login").process); // Login User
router.post("/logout", require('../controllers/user/logout').process)


module.exports = router;