const express = require("express");
const logger = require("morgan")
const doctorRouter = require("./routes/doctorRoute")
const technicianRouter = require("./routes/technicianRoute")
const patientRouter = require("./routes/patientRoute");
const errorHandler = require("./controllers/errorHandler");
const path = require("path")
const pug = require("pug")
const app = express();

app.use(logger("dev"))
app.use(express.json())

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/technicians", technicianRouter)
app.use("/api/v1/patients", patientRouter)


// Error middleware
// app.use(errorHandler)
module.exports = app;