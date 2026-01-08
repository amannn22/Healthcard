const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../"))); 

connectDB();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/doctor", require("./routes/doctor.routes"));
app.use("/api/patient", require("./routes/patient.routes"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`MediConnect running at http://localhost:${PORT}`);
});