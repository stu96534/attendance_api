const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      console.log(userData)
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
  getCurrentUser: (req, res, next) => {
   
    return res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      isAdmin: req.user.isAdmin
    })

  },
  editCurrentUser: async (req, res, next) => {

    try {

      const userId = req.user.id
      const id = req.params.id
      const { email, password, newPassword, checkPassword } = req.body
      const { email: currentEmail, password: currentPassword } = req.user

      if (Number(id) !== Number(userId)) {
        return res.status(401).json({
          status: 'error',
          message: '無法編輯此用戶！'
        })
      }

      if (email !== currentEmail) {
        return res.status(401).json({
          status: 'error',
          message: '帳號錯誤，請重新輸入！'
        })
      }

      if (!bcrypt.compareSync(password, currentPassword)) {
        return res.status(401).json({
          status: 'error',
          message: '原密碼錯誤，請重新輸入！'
        })
      }

      if (newPassword !== checkPassword) {
        return res.status(401).json({
          status: 'error',
          message: '新密碼與確認密碼不相符，請重新輸入！'
        })
      }

      if (newPassword.trim().length < 6 || newPassword.trim().length > 12) {
        return res.status(401).json({
          status: 'error',
          message: '密碼長度需為6~12字元！'
        })
      }

      const user = await User.findByPk(userId)

      await user.update({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null)
      })


      return res.status(200).json({
        status: 'success',
        message: '密碼更新成功！'
      })

    } catch (error) {

      console.log(error)

    }

  }

}

module.exports = userController
