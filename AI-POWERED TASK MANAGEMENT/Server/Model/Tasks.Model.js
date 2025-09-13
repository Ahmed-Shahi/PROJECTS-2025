const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do"
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
},
    { timestamps: true });

    
const Tasks = mongoose.model("task", taskSchema);

module.exports = Tasks
