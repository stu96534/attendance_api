const { User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

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
  }
}

module.exports = adminController