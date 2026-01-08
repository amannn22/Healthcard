const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  patientId: String,
  name: String,
  email: String,
  password: String,
  height: Number,
  weight: Number,
  blood: String,
  qrCode: String,
  healthReport: String,
  medications: String,
  testReports: String
});

module.exports = mongoose.model("Patient", PatientSchema);
