const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  (req, email, password, cb) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          req.authError = "此帳號不存在！"
          return cb(null, false)
        }

        return bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) {
              req.authError = "密碼錯誤！"
              return cb(null, false)
            }
// console.log(req)
            // console.log(user)
            return cb(null, user)
          })
      })
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {

  User.findByPk(jwtPayload.id)
    .then(user => {
      cb(null, user)
    })
    .catch(err => cb(err))
}))


passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findByPk(id)
    .then(user => {
      console.log(user)
      cb(null, user.toJSON())
    })
    .catch(err => cb(err))
})



module.exports = passport