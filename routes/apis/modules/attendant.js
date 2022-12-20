const express = require('express')
const router = express.Router()
const attController = require('../../../controllers/att-controller')

router.get('/', attController.getAttendant)

module.exports = router
