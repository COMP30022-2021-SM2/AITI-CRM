const mongoose = require("mongoose")

// Product model
const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, require: true, ref:"User" },
    tag: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    available: { type: Boolean, default:true, require: true},
    description: String
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product