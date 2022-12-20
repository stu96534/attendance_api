const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')

const attendant = require('./modules/attendant')
const userController = require('../../controllers/user-controller')
const { authenticated } = require('../../middleware/auth')
const { authErrorHandler, apiErrorHandler } = require('../../middleware/error-handler')


router.post('/users/signin', passport.authenticate('local', { session: false, failWithError: true }), userController.signIn, authErrorHandler)

router.use('/attendant', attendant)

router.use('/', (req, res) => res.redirect('/api/attendant'))

router.use('/', apiErrorHandler )

module.exports = router
