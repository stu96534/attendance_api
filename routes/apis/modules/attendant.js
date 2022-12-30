const express = require('express')
const router = express.Router()
const attController = require('../../../controllers/att-controller')

router.post('/:id', attController.addAttendant)

module.exports = router
