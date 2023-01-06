const express = require('express')
const router = express.Router()
const attController = require('../../../controllers/att-controller')

router.get('/location', attController.getLocation)
router.put('/:id', attController.addAttendant)


module.exports = router
