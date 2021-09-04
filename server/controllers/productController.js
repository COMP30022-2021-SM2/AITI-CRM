const Product = require('../models/product')
const mongoose = require('mongoose')

// add product
const addProduct = async(req,res)=>{
    const newProduct = new Product({
        tag: req.body.tag,
        name: req.body.name,
        description: req.body.description
    })

    await newProduct.save()
    .then( (result) => res.send(result))
    .catch((err)=> res.send(err))
}

// update product information
const updateProduct = async(req, res)=>{
    const productTag = req.params.tag;
    try{
        let product = await Product.findOne({tag: req.params.tag})
        let productname = req.body.name;
        let productDescription = req.body.description
        let productTag = req.body.tag
        let productAvailable = req.body.available

        if(productTag){
            await Product.updateOne({tag: req.params.tag}, {$set: {tag: productTag}})
        }
        if (productname){
            await Product.updateOne({tag: req.params.tag}, {$set: {name: productname}})
        }
        if (productDescription){
            await Product.updateOne({ tag: req.params.tag}, {$set: {description: productDescription}})
        }
        if (productAvailable){
            await Product.updateOne({ tag: req.params.tag}, {$set: {available: productAvailable}})
        }
        
        product = await Product.findOne({tag: req.params.tag})
        if (product){
            console.log("Update product sucessfully")
            res.send(product)
        }else{
            console.log("cannot find product")
        }
    }
    catch (err) {
        console.log(err)
    } 
}

// delete product 
const deleteProduct = async(req, res)=>{
    await Product.findOneAndDelete({tag: req.params.tag})
    .then( (result) => res.send(result))
    .catch((err)=> res.send(err))
}

// get product
const getProduct = async(req, res)=>{
    try {
        // find the product
        const product = await Product.find({ tag: req.params.tag }, { tag: true, name: true, price: true, photo: true, description: true }).lean()
            // if product does not exist
        if (product.length == 0) {
            console.log("Product does not exist!")
            res.status(400).json({ msg: '"Product does not exist!' })
        }
        res.send(product)
    } catch (err) {
        console.log("Database query 'menu' failed!")
        res.status(500).json({ msg: err })
    }
}

module.exports = {addProduct, updateProduct, deleteProduct, getProduct}