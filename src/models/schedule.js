const mongoose = require("mongoose")

// Product model
const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, require: true, ref:"User" },
    customerId: { type: mongoose.Types.ObjectId, require: true, ref: "Customer"},
    time: {type: Date, require: True},
    type: {type: String, enum:["In Person", "Phone", "Online"], require: True},
    notes: String
})

const Schedule = mongoose.model('Schedule', productSchema)
module.exports = Schedule