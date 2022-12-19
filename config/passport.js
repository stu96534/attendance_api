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
            const errCount = user.toJSON().errCount
            const locked = user.toJSON().locked

            if (errCount >= 5) {              // 密碼錯誤5次上鎖
              user.update({
                locked: true,
                errCount: 0
              })
            }

            if (locked) {                    // 上鎖後拋出的錯誤
              req.authError = "密碼錯誤達五次，已上鎖"
              return cb(null, false)
            }

            if (!res) {                      // 密碼錯誤拋出錯誤
              user.increment({ errCount: 1})
              req.authError = "密碼錯誤！"
              
              return cb(null, false)
            }
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
      cb(null, user.toJSON())
    })
    .catch(err => cb(err))
})



module.exports = passport