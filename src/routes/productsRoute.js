const express = require('express')
const router = express.Router()
const productControllers = require('../controllers/productController')


router.get('/', productControllers.getAll) // GET ALL PRODUCTS
router.get('/:id', productControllers.getById) // GET PRODUCT BY ID
router.post('/', productControllers.create) // CREATE PRODUCT
router.put('/:id', productControllers.update) // UPDATE PRODUCT
router.delete('/:id', productControllers.delete) // DELETE PRODUCT

module.exports = router