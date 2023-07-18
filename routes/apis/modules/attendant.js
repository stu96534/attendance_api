const express = require('express')
const router = express.Router()
const attController = require('../../../controllers/att-controller')

router.post('/:id', attController.addAttendant)
router.put('/:id', attController.putAttendant)

module.exports = router
