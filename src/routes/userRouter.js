const express = require('express')
const passport = require('passport')
const utilities = require('./utility')
require('../config/passport')(passport)
const userRouter = express.Router()

userRouter.get('/login',utilities.isNotLoggedIn, (req, res) => {
    res.send('you are trying to login')
})

userRouter.get('/signup', utilities.isNotLoggedIn, (req, res) => {
    res.send('you are trying to create an new account')
})

userRouter.post('/login', utilities.isNotLoggedIn, passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}))

userRouter.post('/signup', utilities.isNotLoggedIn, passport.authenticate('local-signup', {
    successRedirect: '/login', // redirect to the homepage
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash messages
}))

// LOGOUT
userRouter.post('/logout', function(req, res) {
    // save the favourites
    req.logout();
    console.log('logout successfully')
    res.redirect('/login');
});

module.exports = userRouter