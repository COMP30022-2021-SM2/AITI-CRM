const cors = require('cors')
const dotenv = require('dotenv').config()
const express = require('express')
const flash = require('connect-flash-plus')
const passport = require('passport')
const session = require('express-session')

require('./db')

// Define routers
const userRouter = require('./routes/userRouter')

// Express configuration
const app = express()

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
        maxAge: 1000 * 30
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


app.get('/', (req,res)=>{
    res.send('Have you sold grape today:)')
})

app.use('/', userRouter) //for login signup etc


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})