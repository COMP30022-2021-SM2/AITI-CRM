const mongoose = require("mongoose")

// Product model
const productSchema = new mongoose.Schema({
    tag: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    photo: String,
    description: String
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product