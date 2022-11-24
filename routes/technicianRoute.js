const express = require('express');
const technicianController = require('../controllers/technicianController');
const patientController = require("../controllers/patientController")

const router = express.Router();

router.post('/signUp', technicianController.signUp);
router.post('/logIn', technicianController.logIn);
router.post('/getPatient', patientController.getPatient)
router.post('/postTest', patientController.postTest)

module.exports = router;