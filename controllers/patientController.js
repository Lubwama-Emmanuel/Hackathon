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

exports.getPatient = catchAsync(async (req, res, next) => {
    const { email } = req.body
    const patient = await Patient.findOne({ email });

    createResponse(patient, 200, res)
})

exports.getPatients = catchAsync(async (req, res, next) => {
    const patients = await Patient.find();

    createResponse(patients, 200, res)
})

exports.postTest = catchAsync(async (req, res, next) => {
    let result
    const { email, pH, pCO2, HCO3 } = req.body
    const patient = await Patient.findOne({ email });

    const updatePatient = await Patient.findByIdAndUpdate(patient.id, { pH, pCO2, HCO3 })
    console.log(patient.id)
    console.log("Here", patient)

    if (updatePatient.pH > 7.45) {
        result = 'Acidosis'
    } else if (updatePatient.pH < 7.35) {
        result = "Alkalosis"
    }

    res.status(200).json({
        status: 'Success',
        data: {
            result
        },
    });
})