const express = require('express')
const passport = require('passport')
const utilities = require('./utility')
require('../config/passport')(passport)
const userRouter = express.Router()
const userController = require('../controllers/userController')

// Login
userRouter.get('/login',utilities.isNotLoggedIn, (req, res) => {
    res.send('you are trying to login')
})

userRouter.post('/login', utilities.isNotLoggedIn, passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}))

// Signup
userRouter.get('/signup', utilities.isNotLoggedIn, (req, res) => {
    res.send('you are trying to create an new account')
})

userRouter.post('/signup', utilities.isNotLoggedIn, passport.authenticate('local-signup', {
    successRedirect: '/login', // redirect to the homepage
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash messages
}))

// Logout
userRouter.post('/logout', function(req, res) {
    // save the favourites
    req.logout();
    console.log('logout successfully')
    res.redirect('/login');
});

// render view profile page
userRouter.get('/profile', utilities.isLoggedIn, (req, res) => userController.renderProfilePage(req, res,1))

// handle get request to render edit profile page
userRouter.get('/profile/update/:userid', utilities.isLoggedIn, (req, res) => userController.renderProfilePage(req, res,0))

// edit profile
userRouter.post('/profile/update/:userid', userController.updateProfile)

module.exports = userRouter