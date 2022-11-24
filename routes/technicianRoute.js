const express = require('express');
const technicianController = require('../controllers/technicianController');

const router = express.Router();

router.post('/signUp', technicianController.signUp);
router.post('/logIn', technicianController.logIn);

module.exports = router;