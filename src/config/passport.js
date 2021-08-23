require('dotenv').config() // for JWT password key

const LocalStrategy = require('passport-local').Strategy

const User = require('../model/user')

