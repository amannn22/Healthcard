const express = require("express");
const router = express.Router();
// These paths correctly go up one level (..) to find folders
const auth = require("../middleware/auth.middleware");
const { updatePatient, getAllPatients } = require("../controllers/doctor.controller");

router.get("/patients", auth, getAllPatients);
router.put("/patient/:id", auth, updatePatient);

module.exports = router;