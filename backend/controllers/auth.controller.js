const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const generateQR = require("../utils/generateQR");
const sendEmail = require("../utils/sendEmail");

exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password, height, weight, blood } = req.body;
    
    let user = await Patient.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const patientId = "PAT-" + Date.now();
    const qrCode = await generateQR(patientId);

    const patient = await Patient.create({
      name, email, password: hash, patientId, qrCode, height, weight, blood
    });

    // Try to send email but don't crash if it fails
    try {
        await sendEmail(email, "Welcome to MediConnect", `Your Patient ID: ${patientId}`);
    } catch (mailErr) {
        console.error("Email failed:", mailErr.message);
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: "Registration failed: " + err.message });
  }
};

// ADD THIS FUNCTION - It was missing!
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, licenseId, specialization } = req.body;
    
    let user = await Doctor.findOne({ email });
    if (user) return res.status(400).json({ msg: "Doctor already exists" });

    const hash = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name, email, password: hash, licenseId, specialization
    });

    res.json({ msg: "Doctor registered successfully", doctor });
  } catch (err) {
    res.status(500).json({ msg: "Doctor registration failed: " + err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  const Model = role === "doctor" ? Doctor : Patient;

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};