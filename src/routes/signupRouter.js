const express = require('express')
const passport = require('passport')
const expressValidator = require('express-validator')
const signupRouter = express.Router()

signupRouter.get('/', (req, res) => {
    res.send("you are trying to create an new account")
})

module.exports = signupRouter