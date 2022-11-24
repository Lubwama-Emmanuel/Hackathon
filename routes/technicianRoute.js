const express = require('express');
const technicianController = require('../controllers/technicianController');
const patientController = require("../controllers/patientController")

const router = express.Router();

router.post('/signUp', technicianController.signUp);
router.post('/logIn', technicianController.logIn);
router.post('/getPatient', patientController.getPatient)
router.post('/basicTest', patientController.postTest)
router.post("/advancedTest", patientController.advancedTest)
router.get("/report", patientController.report)

module.exports = router;