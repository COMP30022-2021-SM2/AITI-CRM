const Customer = require('../models/customer')
const mongoose = require('mongoose')

// Add new customer
const addCustomer = async(req, res) => {
    const newCustomer = new Customer({
        tag: req.body.tag,
        name: req.body.name,
        description: req.body.description,
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        companyName: req.body.companyName,
        address: req.body.address,
        abn: req.body.abn,
        notes : req.body.notes
    })

    await newCustomer.save((err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        return res.redirect('/customer')
    })
}

module.exports = { addCustomer }
