const express = require('express')

// Define routers
const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')
const productRouter = require('./routes/productRouter')

// Express configuration
const app = express()
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))

//
app.get('/', (req,res)=>{
    res.send('Have you sold grape today:)')
})

app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/product', productRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})