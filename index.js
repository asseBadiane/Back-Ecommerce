const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRoute = require('./routes/usersRoute')
const productsRoute = require('./routes/productsRoute')

app.use('/users', usersRoute)
app.use('/products', productsRoute)


app.listen(3000) 
console.log('Server listening on port 3000 😎')

