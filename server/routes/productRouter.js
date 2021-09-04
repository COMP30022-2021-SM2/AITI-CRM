const express = require("express")
require('jsonwebtoken');
const passport = require('passport');
const productController = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get('/:tag', productController.getProduct)

productRouter.post('/add-product', productController.addProduct)

productRouter.post('/edit/:tag', productController.updateProduct)

productRouter.post('/delete-product/:tag', productController.deleteProduct)

module.exports = productRouter;