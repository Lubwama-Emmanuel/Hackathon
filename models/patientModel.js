const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    sex: {
        type: Number,
    },
    summary: {
        type: String,
    },
    ph: {
        type: Number
    },
    pCO2: {
        type: Number
    },
    HCO3: {
        type: Number
    },
    Na: {
        type: Number
    },
    Cl: {
        type: Number
    },
    Albium: {
        type: Number
    },
    result: {
        type: String
    },
    agStatus: {
        type: String
    },
    ag: {
        type: String
    }
})

module.exports = mongoose.model("Patient", patientSchema)