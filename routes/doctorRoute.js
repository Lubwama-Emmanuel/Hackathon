const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/signUp', doctorController.signUp);
router.post('/logIn', doctorController.logIn);

module.exports = router;