const express = require("express")
require('jsonwebtoken');
const passport = require('passport');
const productController = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get('/:tag', productController.getOneProduct)

productRouter.post('', productController.addProduct)

productRouter.put('/:tag', productController.updateProduct)

productRouter.delete('/:tag', productController.deleteProduct)

productRouter.get('', productController.getAllProduct)

module.exports = productRouter;