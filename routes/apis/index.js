const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const userController = require('../../controllers/user-controller')


router.post('/users/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)

module.exports = router
