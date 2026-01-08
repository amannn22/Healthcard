const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { updatePatient, getAllPatients } = require("../controllers/doctor.controller");

router.get("/patients", auth, getAllPatients);
router.put("/patient/:id", auth, updatePatient);

module.exports = router;