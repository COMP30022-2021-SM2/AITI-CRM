const Product = require('../models/product');
const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

// add product
const addProduct = async(req,res) => {
    let userId = req.cookies['userId'];
    const newProduct = new Product({
        tag: req.body.tag,
        name: req.body.name,
        description: req.body.description,
        available: req.body.available,
        userId: userId
    });

    await newProduct.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: err });
        }
        console.log("Product", newProduct.tag, "added successfully!");
        return res.status(200).json(newProduct);
    })
}

// update product information
const updateProduct = async(req, res) => { 
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    try{
        let productName = req.body.name;
        let productDescription = req.body.description;
        let productTag = req.body.tag
        let productAvailable = req.body.available

        // update  fild that changed
        if (productTag) {
            await Product.updateOne({userId: userId, tag: req.params.tag}, {$set: {tag: productTag}})
        }
        if (productName) {
            await Product.updateOne({userId: userId, tag: req.params.tag}, {$set: {name: productName}})
        }
        if (productDescription) {
            await Product.updateOne({userId: userId, tag: req.params.tag}, {$set: {description: productDescription}})
        }
        if (productAvailable) {
            await Product.updateOne({userId: userId, tag: req.params.tag}, {$set: {available: productAvailable}})
        }
        
        let product = await Product.findOne({userId: userId, tag: req.params.tag});
        if (product) {
            console.log("Update product successfully")
            return res.status(200).json(product);
        } else {
            console.log("could not find product")
            return res.status(500).json({ msg: 'could not find product' })
        }
    }
    catch (err) {
        console.log(err)
        return
    } 
}

// delete product 
const deleteProduct = async(req, res) => { 
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    let productTag = req.params.tag;
    await Product.findOneAndDelete({userId: userId, tag: productTag })
    .then( (result) => res.status(200).send( result ))
    .catch( (err) => res.status(500).json({ msg: err }));
}

// get product
const getOneProduct = async(req, res)=>{
    try {
        // find the product
        const product = await Product.find({ tag: req.params.tag }, { tag: true, name: true, price: true, photo: true, description: true }).lean()
            // if product does not exist
        if (product.length == 0) {
            console.log("Product does not exist!")
            res.status(400).json({ msg: 'Product does not exist!' })
        }
        res.send(product)
    } catch (err) {
        console.log("Database query 'menu' failed!")
        res.status(500).json({ msg: err })
    }
}

const getAllProduct = async(req, res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId)
    try{
        const products = await Product.find({userId: userId}, '-_id').lean()

        if (products.length == 0) {
            return res.json("Please insert product first")
        }

        return res.status(200).json(products)
    }catch (err) {
        console.log("failed to get product to the database!")
        return res.status(500).json({ msg: err });
    }
}

const getAvavilableProduct = async (req, res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId)
    try {
        const availableProducts = await Product.find({ userId: userId }, { available: "true" }).lean()

        if (availableProducts.length == 0) {
            return res.json("No available product")
        }

        return res.status(200).json(availableProducts)
    } catch (err) {
        console.log("failed to get available product to the database!")
        return res.status(500).json({ msg: err });
    }


}

module.exports = { addProduct, updateProduct, deleteProduct, getOneProduct, getAllProduct, getAvavilableProduct }