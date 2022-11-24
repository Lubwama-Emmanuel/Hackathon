const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync")

const createResponse = (patient, statusCode, res) => {
    res.status(statusCode).json({
        status: 'Success',
        data: {
            patient,
        },
    });
};

exports.enterPatient = catchAsync(async (req, res, next) => {
    const patient = await Patient.create(req.body)

    createResponse(patient, 200, res)
})