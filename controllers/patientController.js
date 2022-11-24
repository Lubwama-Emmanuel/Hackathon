const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync")
const Email = require("../utils/email")
const { getResult } = require("../axios/model")

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
    const patient = await Patient.create(req.body);

    if (patient.pH > 7.45) {
        result = 'Acidosis'
    } else if (patient.pH < 7.35) {
        result = "Alkalosis"
    }

    res.status(200).json({
        status: 'Success',
        data: {
            result
        },
    });
})

exports.advancedTest = catchAsync(async (req, res, next) => {
    let result, AG, agStatus
    AG = req.body.Na - (req.body.Cl + req.body.HCO3)
    if (AG > 8 && AG < 12) {
        agStatus = "Normal"
    } else if (AG > 12 && AG < 18) {
        agStatus = "Acidiotic Anion Gap"
    } else if (AG > 18) {
        agStatus = "Abnormally High"
    }
    req.body.agStatus = agStatus;
    req.body.ag = AG;
    
    const { ph, pCO2, HCO3, age, sex } = req.body;
    const got = await getResult({ ph, pCO2, HCO3, age, sex })
    result = got.prediction;
    if(result === 1){
        return result = "Alkalosis"
    } else if (result === 2){
        return result = "Acidosis"
    }
    console.log(result)
    req.body.result = result;
    const patient = await Patient.create(req.body);
    res.status(200).json({
        status: 'Success',
        data: {
            patient
        },
    });
})

exports.report = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const patient = await Patient.findOne({ email })

    const url = 'https:me';
    await new Email(patient, url).sendReport()
    createResponse(patient, 200, res)
})