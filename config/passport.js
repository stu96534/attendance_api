const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')


passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, cb) => {
    User.findOne({ where: email })
      .then(user => {
        if (!user) {
          req.authError = '此帳號不存在'
          return cb(null, false)
        }

        return bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) {
              req.authError = '密碼錯誤'
              return cb(null, false)
            }
          })
      })
  }



))



