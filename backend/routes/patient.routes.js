// patient.routes.js
const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Public route for the scanner to get basic info
router.get("/public/:patientId", async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId })
                                 .select("name healthReport medications testReports");
    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;