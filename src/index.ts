import express  from 'express';
import bodyParser  from 'body-parser'; ;
require('dotenv').config()

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import usersRoute  from './routes/usersRoute'
import productsRoute  from './routes/productsRoute'

app.use('/users', usersRoute)
app.use('/products', productsRoute)


app.listen(process.env.PORT || 4000) 
console.log(`Server listening on port ${process.env.PORT || 3000} 😎`)

