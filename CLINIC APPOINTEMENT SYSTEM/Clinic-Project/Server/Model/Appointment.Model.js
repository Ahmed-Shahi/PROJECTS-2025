const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    patientName: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    doctor: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    disease: {
        type: String,
    },
}, { timestamps: true })


const Appointment = mongoose.model("Appointments", mySchema)

module.exports = Appointment