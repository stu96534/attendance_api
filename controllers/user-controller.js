const jwt = require('jsonwebtoken')
const userController = {
  signIn: (req, res, next) => {
    try {
      req.user.update({
        errCount: 0
      })

      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })

      res.json({
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
