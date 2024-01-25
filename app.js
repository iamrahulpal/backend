// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const health = require("./routes/health");
const cookieParser = require("cookie-parser");

const mongo = require("./util/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Change this to your specific frontend origin in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
console.log("🚀 ~ corsOptions:", corsOptions)
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
mongo.connect();

// Use the userRoutes for all user-related routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  console.log("req data: ", req);
  res.status(200).json({
    data: "Server is healthy."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
