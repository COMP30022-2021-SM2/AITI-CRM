const mongoose = require("mongoose")

// Product model
const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, require: true, ref:"User" },
    customerId: { type: mongoose.Types.ObjectId, require: true, ref: "Customer"},
    time: {type: Date, require: true},
    type: {type: String, enum:["In Person", "Phone", "Online"], require: true},
    status: {type: String, enum:["completed", 'cancel', 'upcoming'], require: true, default:"upcoming"},
    notes: String
})
const Schedule = mongoose.model('Schedule', scheduleSchema)
module.exports = Schedule