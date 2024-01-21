const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/category/createCategory").process);

module.exports = router;
