const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/admin-controller')

router.get('/users', adminController.getUsers)
router.post('/users', adminController.addUser)
router.put('/users/:id/unlock', adminController.userUnlock)


module.exports = router
