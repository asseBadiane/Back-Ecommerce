const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRoute = require('./routes/usersRoute')
const productsRoute = require('./routes/productsRoute')

app.use('/users', usersRoute)
app.use('/products', productsRoute)


app.listen(process.env.PORT || 4000) 
console.log(`Server listening on port ${process.env.PORT || 3000} 😎`)

