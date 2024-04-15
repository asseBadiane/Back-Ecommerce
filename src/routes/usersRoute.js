const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/userController')


router.get('/', usersControllers.getAll) // GET ALL USERS
router.get('/:id', usersControllers.getById) // GET USER BY ID
router.post('/', usersControllers.create) // CREATE USER
router.put('/:id', usersControllers.update) // UPDATE USER
router.delete('/:id', usersControllers.delete) // DELETE USER


module.exports = router