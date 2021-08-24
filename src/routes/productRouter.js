const express = require("express")
const productController = require("../controllers/productController")
const utilities = require('./utility')
const productRouter = express.Router()

productRouter.post('/add-product', utilities.isLoggedIn, productController.addProduct)

productRouter.post('/edit/:tag', utilities.isLoggedIn, productController.updateProduct)

module.exports = productRouter;