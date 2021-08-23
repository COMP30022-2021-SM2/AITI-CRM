const Product = require('../model/product')
const mongoose = require('mongoose')

const addProduct = async(req,res)=>{
    const newProduct = new Product({
        tag: req.body.tag,
        name: req.body.name,
        photo: req.body.photo,
        description: req.body.description
    })

    await newProduct.save()
    result = await Product.find({tag: req.body.tag})
    res.send(result)
}

module.exports = {addProduct}