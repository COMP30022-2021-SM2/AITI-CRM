const mongoose = require('mongoose')
const Order = require('./order')

const addressSchema = new mongoose.Schema({
    _id: false,
    addressLine1: { type: String, required: true },
    addressLine2: String,
    postcode: { type: Number, required: true },
    suburb: { type: String, required: true },
    state: { type: String, enum: ["ACT", "NSW", "NT", "QLD", "SA", "VIC", "TAS", "WA"], required: true}
})

// Customer model
const customerSchema = new mongoose.Schema({
    givenName: { type: String, require: true },
    familyName: { type: String, require: true },
    emailAddress: { type: String, require: true, unique: true },
    phoneNumber: { type: Number, require: true, unique: true},
    companyName: { type: String, require: true },
    address: { type: addressSchema, required: true },
    abn: { type: Number, require: true, unique: true },
    notes : String
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer