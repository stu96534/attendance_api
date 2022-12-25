const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user-controller')

router.get('/', userController.getCurrentUser)
router.put('/:id', userController.editCurrentUser)

module.exports = router
