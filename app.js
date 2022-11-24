const express = require("express");
const logger = require("morgan")
const doctorRouter = require("./routes/doctorRoute")
const technicianRouter = require("./routes/technicianRoute")
const patientRouter = require("./routes/patientRoute")

const app = express();

app.use(logger("dev"))
app.use(express.json())

app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/technicians", technicianRouter)
app.use("/api/v1/patients", patientRouter)

module.exports = app;