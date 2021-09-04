const express = require('express')
const flash = require('connect-flash-plus')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config()
require('./config/db') // connect to database

// Define routers
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')

/* ----------------------Express configuration----------------------- */

const app = express()
app.use(express.json())
app.use(cookieParser());

app.use(cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: "http://localhost:5000"
}));

// setup a session store signing the contents using the secret key
app.use(session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000   //30 days
    }
}));

//middleware that's required for passport to operate
app.use(passport.initialize());

// middleware to store user object
app.use(passport.session());

// use flash to store messages
app.use(flash());

// we need to add the following line so that we can access the
// body of a POST request as  using JSON like syntax
app.use(express.urlencoded({ extended: true }))

/* --------------------------------------------------------------- */

app.get('/', (req,res)=>{
    if (req.isAuthenticated()) {
        const fullName = { givenName: req.user.givenName, familyName: req.user.familyName }
        return res.json(fullName)
    }
    res.send('Welcome to homepage, but you have not logged in')
})

app.use('/', userRouter) //for login signup etc
app.use('/product', passport.authenticate('jwt', { session: false }), productRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})