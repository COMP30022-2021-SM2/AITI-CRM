const express = require('express')
const flash = require('connect-flash-plus')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

require('dotenv').config()
require('./config/db') // connect to database

// Define routers
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const testAPIRouter = require('./routes/testAPI')
/* ----------------------Express configuration----------------------- */

const app = express()
app.use(express.json())

app.use(cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: "http://localhost:3000"
}));

// setup a session store signing the contents using the secret key
app.use(session({
    //secret: process.env.SECRET,
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 30   //30 days
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

// define where static assets live
app.use(express.static('public'))

/* --------------------------------------------------------------- */

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send("Welcome to homepage: " + req.user.givenName + " " + req.user.familyName)
    }
    res.send('Welcome to homepage, but you have not logged in')
})

app.use('/', userRouter) //for login signup etc
app.use('/product', productRouter)
app.use('/testAPI', testAPIRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})