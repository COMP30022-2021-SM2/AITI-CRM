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

const updateProduct = async(req, res)=>{
    const productTag = req.params.tag;
    try{
        let product = await Product.findOne({tag: productTag})
        let productname = req.body.name;
        let productDescription = req.body.description

        if (productname){
            await Product.updateOne({tag: productTag}, {$set: {name: productname}})
        }
        if (productDescription){
            await Product.updateOne({ tag: productTag}, {$set: {description: productDescription}})
        }
        product = await Product.findOne({tag: productTag})
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

module.exports = {addProduct, updateProduct}