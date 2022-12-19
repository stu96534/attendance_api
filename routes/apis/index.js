const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const userController = require('../../controllers/user-controller')
const { authErrorHandler } = require('../../middleware/error-handler')


router.post('/users/signin', passport.authenticate('local', { session: false, failWithError: true }), userController.signIn, authErrorHandler)

module.exports = router
