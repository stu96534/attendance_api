const { User, Attendant, Location } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const bcrypt = require('bcryptjs')
const { calendarTransformOwnData, getCalendarOfYear } = require('../helpers/helpers')

//2023行事曆
const date2023 = require('../config/2023.json')
const calendar2023 = calendarTransformOwnData(date2023)

const adminController = {
  getUsers: (req, res, next) => {
    //頁碼
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    //員工列表
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
      const account = req.body.account
      const email = req.body.email

      if ((name.trim().length === 0 || email.trim().length === 0) || account.trim().length === 0) throw new Error('請在欄位輸入資料') 

      const enterAccount = await User.findOne({ where: { account } })

      const enterEmail = await User.findOne({ where: { email } })

      if (enterAccount) throw new Error('此帳號已被新增過')

      if (enterEmail) throw new Error('此信箱已被新增過') 

      const createUser = await User.create({
        name,
        account,
        email,
        password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
        locked: false,
        errCount: false,
        isAdmin: false
      })

      const calendar = getCalendarOfYear(createUser,calendar2023)

      calendar.map( async (attendant) => {
       await Attendant.create(attendant)
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

      //頁碼
      const DEFAULT_LIMIT = 11
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      
      let attendants = await Attendant.findAndCountAll({
        where: { UserId, month },
        limit,
        offset,
        nest: true,
        raw: true
      })

    let data = attendants.rows.map(att => {
        return {
          id: att.id,
          date: att.date,
          week: att.week,
          checkIn: att.checkIn,
          checkOut: att.checkOut,
          description: att.description,
          isHoliday: att.isHoliday,
          isAbsense: att.isAbsense,
          isAttendant: att.isAttendant
        }
      })

      return res.status(200).json({
        attendants: data,
        month,
        pagination: getPagination(limit, page, attendants.count)
      })
    } catch (err) {
      next(err)
    }
  },
  changeAttendant: async (req, res, next) => {
    try {
      const { id } = req.body

      let attendants = await Attendant.findByPk(id)

      if (!attendants) throw new Error('無法操作此項目') 

      await attendants.update({
        isAbsense: false,
        isAttendant:true
      })

      return res.status(200).json({
        status: 'success'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
