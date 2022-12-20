const jwt = require('jsonwebtoken')
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
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = userController
