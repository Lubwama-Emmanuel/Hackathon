const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    degree: {
        type: String,
    },
    password: {
        type: String
    }
})
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    return next();
});

module.exports = mongoose.model("Doctor", doctorSchema)