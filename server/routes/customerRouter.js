const express = require("express")
const customerController = require("../controllers/customerController")
const utilities = require('./utility')
const customerRouter = express.Router()

// Add new customer
customerRouter.post('/customer/add-customer', customerController.addCustomer)

module.exports = customerRouter;