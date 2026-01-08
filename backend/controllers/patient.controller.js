const Patient = require("../models/Patient");

// Private: Get profile for logged-in user dashboard
exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password");
    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// NEW Public: Fetch data for QR Web Portal based on Patient ID
exports.getPublicProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId }).select("-password");
    if (!patient) return res.status(404).json({ msg: "Medical record not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: "Database error" });
  }
};
