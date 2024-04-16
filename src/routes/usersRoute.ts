import express from 'express'
import { userController } from '../controllers/userController'
const router = express.Router()

router.get('/', userController.getAll) // GET ALL USERS
router.get('/:id', userController.getById) // GET USER BY ID
router.post('/', userController.create) // CREATE USER
router.put('/:id', userController.update) // UPDATE USER
router.delete('/:id', userController.delete) // DELETE USER


export default router