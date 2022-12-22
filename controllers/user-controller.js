const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password

      if (userData.locked) {
        return res.status(401).json({
          status: 'error',
          message: '密碼錯誤達五次，已上鎖'
        })
      }

      req.user.update({
        errCount: 0
      })

      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })

      res.status(200).json({
        status: 'success',
        token,
        user: userData
      })
    } catch (err) {
      next(err)
    }
  },
  getUser: (req, res, next) => {
    return res.status(200).json({
      email: req.user.email,
    })
  },
  editUser: (req, rea, next) => {
    const userId = req.user.userId
    const { email, password, newPassword, checkPassword } = req.body
    const { email: currentEmail, password: currentPassword } = req.user

    if (email !== currentEmail) {
      return res.status(401).json({
        status: 'error',
        message: '你不是此帳號的用戶！'
      })
    }

    if (password !== currentPassword) {
      return res.status(401).json({
        status: 'error',
        message: '請輸入正確的密碼！'
      })
    }

     User.findByPk(userId)
      .then(user => {
        user.update({
          password: bcrypt.hash(newPassword, getslat(10), null)
        })
      })
      .then(() => {
       return res.status(200).json({
          status: 'success',
          message: '密碼更新成功！'
        })
      })
      .catch(err => next(err))

  }

}

module.exports = userController
