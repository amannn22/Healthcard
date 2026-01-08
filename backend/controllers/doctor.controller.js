const Patient = require("../models/Patient");
const sendEmail = require("../utils/sendEmail");

// Fetch all patients for the registry list
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch patients" });
  }
};

// Update record and notify patient
exports.updatePatient = async (req, res) => {
  try {
    // Explicitly mapping fields from the frontend request to the database
    const patient = await Patient.findByIdAndUpdate(
      req.params.id, 
      {
        healthReport: req.body.healthReport,
        medications: req.body.medications,
        testReports: req.body.testReports
      }, 
      { new: true }
    );

    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    // Send notification email
    try {
        await sendEmail(
          patient.email,
          "Medical Record Updated",
          "Your medical records were updated by your doctor. Please log in to your portal to view changes."
        );
    } catch (emailErr) {
        console.log("Email failed to send, but data was saved.");
    }

    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during update" });
  }
};