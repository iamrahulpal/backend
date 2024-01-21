// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const health = require("./routes/health")

const mongo = require('./util/db')
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

mongo.connect()
app.use(cors())
app.use(bodyParser.json());


// Use the userRoutes for all user-related routes
app.use("/api/post", postRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;