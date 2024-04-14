const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login/:filename', function(req, res) {
    console.log('req params', req.params)
    console.log('req query', req.query)
    console.log('req body', req.body)
    console.log('req headers', req.headers)
    res.sendFile(path.join(__dirname, 'static', req.params.filename))
})

app.get('/', function (req, res) {
  const contentHtml = `
  <head>
    <title>Welcome to My Ecommerce</title>
  </head>
  <body>
    <h1>Hello World 😀</h1>
  </body>
  `
  res.set('Content-Type', 'text/html')
  res.set('Server', 'My Ecommerce Server')
  res.send(contentHtml)
})

app.listen(3000) 

console.log('Server listening on port 3000 😎')

