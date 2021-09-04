const express = require("express");

const jwt = require('jsonwebtoken');
const { deserializeUser } = require('passport');

const passport = require('passport')
require('../config/passport')(passport)
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/login', userController.login);

userRouter.post('/signup', userController.signup);

// Logout
userRouter.post('/logout', function(req, res) {
    // save the favourites
    res.clearCookie('_id');
    console.log('logout successfully')
    res.status(200).json({ msg: 'Logout successfully' })
});

// render view profile page
userRouter.get('/profile', passport.authenticate('jwt', { session: false }), userController.getUserInfo)

// edit profile
userRouter.post('/profile/update/:userid', passport.authenticate('jwt', { session: false }),  userController.updateProfile)

module.exports = userRouter