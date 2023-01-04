const { User, Attendant } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const bcrypt = require('bcryptjs')
const { dateStr } = require('../helpers/helpers')
const date2023 = require('../config/2023.json')
const Str2023 = date2023.map(d => ({
  date: dateStr(d.date),
  week: d.week,
  description: d.description,
  is_holiday: d.isHoliday,
  month: new Date(dateStr(d.date)).getMonth() + 1,
  is_absense: false
}))

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
  addUser: async (req, res, next) => {
    try {
      const name = req.body.name
      const email = req.body.email

      if (name.trim().length === 0 || email.trim().length === 0) {
        return res.status(401).json({
          status: 'error',
          message: '請在欄位輸入資料'
        })
      }

      const enterEmail = await User.findOne({ where: { email } })

      if (enterEmail) {
        return res.status(401).json({
          status: 'error',
          message: '此信箱已被新增過'
        })
      }

      const createUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
        locked: false,
        errCount: false,
        isAdmin: false
      })

      const fullYearDay = Array.from({ length: date2023.length }).map((_, i) => ({
        UserId: Number(createUser.id),
        date: Str2023[i].date,
        month: Str2023[i].month,
        week: Str2023[i].week,
        description: Str2023[i].description,
        isHoliday: Str2023[i].is_holiday,
        isAbsense: false,
        created_at: new Date(),
        updated_at: new Date()
      }))

      fullYearDay.map(attendant => {
        Attendant.create(attendant)
      })

      return res.status(200).json({
        status: 'success',
        message: '新增成功'
      })

    } catch (err) {
      next(err)
    }
  },
  getUserAttendant: async (req, res, next) => {
    try {
      const UserId = req.params.id
      const month = req.query.month

      let attendants = await Attendant.findAll({
        where: { UserId, month }
      })

      attendants = attendants.map(att => {
        return {
          date: att.date,
          week: att.week,
          checkIn: att.checkIn,
          checkOut: att.checkOut,
          description: att.description,
          isHoliday: att.isHoliday,
          isAbsense: att.isAbsense
        }
      })

      return res.status(200).json(attendants)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController