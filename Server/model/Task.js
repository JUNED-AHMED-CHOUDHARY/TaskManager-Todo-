const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, 
        }, 
        description: {
            type: String, 
            required: true, 
        }, 
        status: {
            type: String,
            enum: ["Completed", "Incomplete"], 
            default: "Incomplete",
        }, 
        archived: {
            type: Boolean, 
            default: false, 
        }, 
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
        }, 
        createAt: {
            type: Date, 
            default: Date.now(), 
        }
    }
);


module.exports = mongoose.model("Task", taskSchema);