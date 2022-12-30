const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')

const attendant = require('./modules/attendant')
const admin = require('./modules/admin')
const users = require('./modules/users')
const userController = require('../../controllers/user-controller')
const { authenticated } = require('../../middleware/auth')
const { authErrorHandler, apiErrorHandler } = require('../../middleware/error-handler')


router.post('/users/signin', passport.authenticate('local', { session: false, failWithError: true }), userController.signIn, authErrorHandler)

router.use('/current_user', passport.authenticate('jwt', { session: false }), users)

router.use('/attendant', attendant)

router.use('/admin', authenticated, admin)

router.use('/', (req, res) => res.redirect('/api/attendant'))

router.use('/', apiErrorHandler )

module.exports = router
