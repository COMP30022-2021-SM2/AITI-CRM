const Order = require("../models/order")
const Customer = require("../models/customer")
const User = require("../models/user")
const mongoose = require('mongoose')
const Product = require("../models/product")
const Timestamp = mongoose.model('Timestamp')

// add new order
const addOrder = async(req, res) => {
    let cart = req.body;
    let totalPrice = 0;
    // calculate total price
    for (let i=0; i < cart.length; i++){
        totalPrice += cart[i]["price"]
    }

    let userId = req.cookies['userId'];
    let customerId = req.params.customerId;
    console.log('getUserInfo:', userId);
    console.log('getCustomerInfo:', customerId);

    // check customer exist
    let customerId
    try{
        let customerDetail = await Customer.findOne({_id: costomerId}, {_id: true})
        if (customerDetail) {
            //pass
        } else {
            console.log("no such customer: ", customerId)
            return res.redirect('/404-NOT-FOUND')
        }
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return res.status(500).json({ msg: 'could not find customer' })
    }

    const newOrder = new Order({
        userId: userId,
        customerId: customerId,
        details: cart,
        total: totalPrice,
        status: "ongoing"
    })
    
    // push order to database
    await newOrder.save((err, result) => {
        if (err) {
            console.log("failed to save order to the database!")
            return res.status(500).json({ msg: err });
        }
        console.log("Order", newOrder._if, "added successfully!");
        return res.status(200).json(newOrder);
    })

}

// get orders under one user
const getAllOrder = async(req, res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    try{
        const orders = await Product.find({userId: userId}, {}).lean()

        if (orders.length == 0){
            return res.json("No orders")
        }

        return res.status(200).json(orders)
    } catch (err) {
        console.log("failed to get product to the database!")
        return res.status(500).json({ msg: err });
    }
}

// order relatd to particular customer
const getCustomerOrder = async(req,res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    let customerId = req.params.customerId;
    customerId = new ObjectId(customerId);
    try {
        const orders = await Product.find({userId: userId, customerId: customerId}, {}).populate("customerId", "-_id").lean()
        if (orders.length == 0){
            return res.json("No transaction with this customer ")
        }

        return res.status(200).json(orders)
    } catch (err) {
        console.log("failed to get product to the database!")
        return res.status(500).json({ msg: err });
    }
}

// update order
// const updateOrder = async(req, res) => {
//     let userId = req.cookies['userId'];
//     userId = new ObjectId(userId);

//     try{
        
//     }
// }


module.exports ={addOrder}