const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user-controller')

router.put('/:id', userController.editCurrentUser)
router.get('/', userController.getCurrentUser)

module.exports = router
