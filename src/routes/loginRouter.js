const express = require('express')
const passport = require('passport')

const loginRouter = express.Router()

loginRouter.get('/', (req, res) => {
    res.send("you are trying to login")
})

module.exports = loginRouter