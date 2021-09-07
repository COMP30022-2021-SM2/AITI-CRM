const express = require("express")
require('jsonwebtoken');
const passport = require('passport');
const productController = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get('/:tag', productController.getOneProduct)

productRouter.post('/add-product', productController.addProduct)

productRouter.put('/edit/:tag', productController.updateProduct)

productRouter.delete('/delete-product/:tag', productController.deleteProduct)

productRouter.get('/', productController.getAllProduct)

module.exports = productRouter;