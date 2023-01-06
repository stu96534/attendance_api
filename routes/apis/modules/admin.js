const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/admin-controller')

router.get('/users/:id/attendant', adminController.getUserAttendant)
router.put('/users/:id/unlock', adminController.userUnlock)
router.put('/location', adminController.changeLocation)
router.get('/users', adminController.getUsers)
router.post('/users', adminController.addUser)



module.exports = router
