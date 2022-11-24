const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const technicianSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
})
technicianSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    return next();
});

module.exports = mongoose.model("Technician", technicianSchema)