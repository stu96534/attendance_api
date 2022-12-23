const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user-controller')

router.get('/', userController.getUser)
router.put('/:id', userController.editUser)

module.exports = router
