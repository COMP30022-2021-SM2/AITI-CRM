const User = require('../models/user')
const mongoose = require('mongoose')

const updateProfile = async(req, res) => {

    const Userid = req.params.userid;
    try {
        let user = await User.findOne({ _id: userid })
        let givenname = req.body.givenName;
        let familyname = req.body.familyName;
        let emailadress = req.body.emailAddress;
        let password = req.body.password;

        // udpate the information that User has changed
        if (givenname){
            await User.updateOne({ _id: Userid }, { $set: { givenName: givenname } })
        }
        if (familyname){
            await User.updateOne({ _id: Userid }, { $set: { familyName: familyname } })
        }
        if (emailadress){
            await User.updateOne({ _id: Userid }, { $set: { emailAddress: emailadress } })
        }
        if (password){
            await User.updateOne({ _id: Userid }, { $set: { password: User.generateHash(req.body.password) } })
        }
        
        // get User after updating
        user = await User.findOne({ _id: Userid }, { givenName: true, familyName: true, emailAddress: true }).lean()

        if (user) {
            console.log("update profile sucessfully")
            res.send(user)
        } else {
            console.log('User not found')
            res.send("User not found")
        }
    } catch (err) {
        console.log(err)
    }
}

const renderProfilePage = async(req, res, status) => {
    let userId = req.session.userId
    try {
        let result = await User.findOne({ _id: userId }, { givenName: true, familyName: true, emailAddress: true }).lean()
        if (result) {
            // render to view profile page
            if (status === 1) {
                res.render('customer/profile', { "customer": result })
            }

            // render to edit profile page
            if (status === 0) {
                res.render('customer/editProfile', { "customer": result })
            }
        } else {
            console.log('customer not found')
            return res.redirect('/customer/login')

        }
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return req.redirect('/404-NOT-FOUND')
    }
}

module.exports={updateProfile, renderProfilePage}