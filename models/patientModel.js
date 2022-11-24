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
    }
})

module.exports = mongoose.model("Patient", patientSchema)