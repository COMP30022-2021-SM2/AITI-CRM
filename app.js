const express = require('express')
const app=express();

app.get('/', (req,res)=>{
    res.send('Have you sold grape today:)')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})