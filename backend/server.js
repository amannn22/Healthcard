const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db"); // Uses your db.js

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./"))); // Serves index.html and profile.html

// Routes
app.use("/api/auth", require("./auth.routes"));
app.use("/api/patient", require("./patient.routes"));
app.use("/api/doctor", require("./doctor.routes"));

// UptimeRobot Ping Route
app.get("/ping", (req, res) => {
  res.status(200).send("Server Active");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});