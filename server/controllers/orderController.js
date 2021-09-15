const Order = require("../models/order")
const Customer = require("../models/customer")
const User = require("../models/user")
const mongoose = require('mongoose')
const Product = require("../models/product")
const ObjectId = require('mongoose').Types.ObjectId;


// add new order
const addOrder = async(req, res) => {
    let cart = req.body;
    let totalPrice = 0;
    // calculate total price
    for (let i=0; i < cart.length; i++){
        totalPrice += cart[i]["price"]
    }

    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    let customerEmail = req.params.emailAddress
    console.log('getUserInfo:', userId);
    console.log('getCustomerInfo:', customerEmail);

    // check customer exist
    try{
        let customerDetail = await Customer.findOne({userId: userId, emailAddress: customerEmail}, {_id: true})
        if (customerDetail) {
            //pass
        } else {
            console.log("no such customer: ", customerId)
            return res.redirect('/404-NOT-FOUND')
        }
    

    const newOrder = new Order({
        userId: userId,
        customerId: customerDetail._id,
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
        console.log("Order", newOrder._id, "added successfully!");
        return res.status(200).json(newOrder);
    })
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return res.status(500).json({ msg: 'could not find customer' })
}

}

// get all order
const getAllOrder = async(req, res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    try{
        const orders = await Order.find({userId: userId}, {}).lean()

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
    let  customerDetail = await Customer.findOne({userId: userId, emailAddress: req.params.emailAddress}, {_id: true})
    let customerId = new ObjectId(customerDetail._id);
    try {
        const orders = await Order.find({userId: userId, customerId: customerId}, {}).populate("customerId", "-_id").lean()
        if (orders.length == 0){
            return res.json("No transaction with this customer ")
        }

        return res.status(200).json(orders)
    } catch (err) {
        console.log("failed to get product to the database!")
        return res.status(500).json({ msg: err });
    }
}

// get order by graph types
const getGrapeOrder = async(req, res) => {
    let userId = req.cookies['userId'];
    userId = new ObjectId(userId);
    let productTag = req.params.productTag
    try{
        const orders = await Order.find({userId: userId, details: {$all: [
            { "$elemMatch" : { name : productTag} }
        ]}})
        if (orders.length == 0){
            return res.json("No transaction with this customer ")
        }

        return res.status(200).json(orders)
    } catch (err) {
        console.log("failed to get product to the database!")
        return res.status(500).json({ msg: err });
    }
}

// delete order
const deleteOrder = async(req, res) => {
    let orderId = req.params.orderId;
    await Order.findOneAndDelete({_id: orderId })
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(500).json({ msg: err }));
}

// update order status
const updateOrderStatus = async(req, res) => {
    let orderId = req.params.orderId
    try{
        let status = req.body.status
        await Order.updateOne({_id: orderId}, {$set: {status: status}})

        let order = await Order.findOne({_id: orderId});
        if (order) {
            console.log("Update order successfully")
            return res.status(200).json(order);
        } else {
            console.log("could not find product")
            return res.status(500).json({ msg: 'could not find product' })
        }
    } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
    } 
}

// update order details
const updateOrderDetails = async(req, res) => {
    let cart = req.body;
    let totalPrice = 0;
    // calculate total price
    for (let i=0; i < cart.length; i++){
        totalPrice += cart[i]["price"]
    }

    let orderId = req.params.orderId
    if (orderId) {
        let result = await Order.findOne({ _id: orderId }, {})
        if (result === null || result === undefined) {
            return res.send("no order found")
        }

        const orderChanged = { details: cart, total: totalPrice }
        // udpate order
        await Order.findOneAndUpdate({ _id: orderId }, orderChanged, { new: true })
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(500).json({ msg: err }));

    }
}







module.exports ={addOrder, getAllOrder, deleteOrder, getCustomerOrder, updateOrderStatus, updateOrderDetails, getGrapeOrder}