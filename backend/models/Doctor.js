const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  licenseId: String,
  password: String,
  specialization: String
});

module.exports = mongoose.model("Doctor", DoctorSchema);
