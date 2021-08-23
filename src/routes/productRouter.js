const express = require("express")
const productController = require("../controllers/productController")
const productRouter = express.Router()

productRouter.post('/add-product', productController.addProduct)

productRouter.post('/edit/:tag', productController.updateProduct)

module.exports = productRouter;