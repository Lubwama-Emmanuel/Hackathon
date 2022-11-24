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
    gender: {
        type: String,
    },
    summary: {
        type: String,
    },
    pH:{
        type: Number
    },
    pCO2: {
        type: Number
    },
    HCO3: {
        type: Number
    }
})

module.exports = mongoose.model("Patient", patientSchema)