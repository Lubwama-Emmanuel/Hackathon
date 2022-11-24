const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/createPatient', patientController.enterPatient);

module.exports = router;