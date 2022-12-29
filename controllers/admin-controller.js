const { User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const bcrypt = require('bcryptjs')

const adminController = {
  getUsers: (req, res, next) => {
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    User.findAndCountAll({
      limit,
      offset,
      nest: true,
      raw: true
    })
      .then(users => {
        const data = users.rows.map(user => ({
          userId: user.id,
          name: user.name,
          email: user.email,
          locked: user.locked,
          isAdmin: user.isAdmin
        }))

        return res.status(200).json({
          users: data,
          pagination: getPagination(limit, page, users.count)
        })
      })
      .catch(err => next(err))
  },
  userUnlock: async (req, res, next) => {
    try {
      const userId = req.params.id
      console.log(userId)

      const user = await User.findByPk(userId)

      await user.update({
        password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
        locked: false
      })

      return res.status(200).json({
        status: 'success',
        message: '此帳號已解鎖'
      })

    } catch (err) {
      next(err)
    }
  },
  addUser: (req, res, next) => {
    const name = req.body.name
    const email = req.body.email

    if (name.trim().length === 0 || email.trim().length === 0) {
      return res.status(401).JSON({
        status: 'error',
        message: '請在欄位輸入資料'
      })
    }

    User.creata({
      name,
      email,
      password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
      locked: false,
      errCount: false,
    })
      .then(() => {
        res.status(200).JSON({
          status: 'success',
          message: '新增成功'
        })
      })
      .catch(err => next(err))

  }
}

module.exports = adminController