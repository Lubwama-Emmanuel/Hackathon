const express = require('express');
const doctorController = require('../controllers/doctorController');
const patientController = require("../controllers/patientController")

const router = express.Router();

router.post('/signUp', doctorController.signUp);
router.post('/logIn', doctorController.logIn)
router.get("/getPatients", patientController.getPatients)

module.exports = router;