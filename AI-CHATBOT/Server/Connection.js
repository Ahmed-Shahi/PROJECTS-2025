const mongoose = require("mongoose")

function Connect(url) {
   return mongoose.connect(url)
}

module.exports = {
    Connect
}