import { Router } from 'express'
const router = Router()
import { productController } from '../controllers/productController'

router.get('/', productController.getAll) // GET ALL PRODUCTS
router.get('/:id', productController.getById) // GET PRODUCT BY ID
router.post('/', productController.create) // CREATE PRODUCT
router.put('/:id', productController.update) // UPDATE PRODUCT
router.delete('/:id', productController.delete) // DELETE PRODUCT

export default router