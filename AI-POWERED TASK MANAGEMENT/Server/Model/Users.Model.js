const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        enum: ["Content-Writer","Frontend-Developer","Backend-Developer","SEO","Quality-Assure","Project-Manager","Team-Lead"]
    }
}, { timestamps: true })


const SignUp = mongoose.model("users", mySchema)

module.exports = SignUp