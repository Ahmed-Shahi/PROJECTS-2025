const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
      chats: [
        {
          question: {
            type: [String],
            required: true
          },
          answer: {
            type: [String],
            required: true
          }
        }
      ],
      timestamp: {
        type: Date,
        default: Date.now
      }
})

const Chats = mongoose.model("Chats", chatSchema)

module.exports = Chats