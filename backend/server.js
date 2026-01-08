const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Pointing to backend/config/db.js as seen in your explorer
const connectDB = require("./config/db"); 

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serving index.html and profile.html from the root folder (one level up)
app.use(express.static(path.join(__dirname, "../"))); 

// Route imports
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/patient", require("./routes/patient.routes"));
app.use("/api/doctor", require("./routes/doctor.routes"));

// Keep-alive route for UptimeRobot
app.get("/ping", (req, res) => {
  res.status(200).send("Server Active");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});