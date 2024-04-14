const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
const db = require('./db')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', function(req, res) {
  

  res.set('Content-Type', 'text/html')
  res.set('Server', 'My Ecommerce Server')
})

app.post('/users', function (req, res) {
  // const contentHtml = `
  // <head>
  //   <title>Welcome to My Ecommerce</title>
  // </head>
  // <body>
  //   <h1>Hello World 😀</h1>
  // </body>
  // `
  const data = req.body
  console.log('data', data)

  res.set('Content-Type', 'text/html')
  res.set('Server', 'My Ecommerce Server')
})

app.listen(3000) 

console.log('Server listening on port 3000 😎')

