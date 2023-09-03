const { User, Attendant, Calendar } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const bcrypt = require('bcryptjs')
const { calendarTransformOwnData, getCalendarOfYear } = require('../helpers/helpers')
const errStrategies = require('../middleware/apiError')
const { notPair } = require('../middleware/funcTools')

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
      order: [['isAdmin', 'DESC']],
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
      const { name, account, email } = req.body
 
      errStrategies.errorMsg(!name.trim(), '請在欄位輸入資料', 401)
      errStrategies.errorMsg(!email.trim(), '請在欄位輸入資料', 401)
      errStrategies.errorMsg(!account.trim(), '請在欄位輸入資料', 401)

      const enterAccount = await User.findOne({ where: { account } })

      const enterEmail = await User.findOne({ where: { email } })

      errStrategies.errorMsg(enterAccount, '此帳號已被新增過', 401)

      errStrategies.errorMsg(enterEmail, '此信箱已被新增過', 401)

      const createUser = await User.create({
        name,
        account,
        email,
        password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
        locked: false,
        errCount: false,
        isAdmin: false
      })

      return res.status(200).json({
        status: 'success',
        message: '新增成功'
      })

    } catch (err) {
      next(err)
    }
  },
  getUserAttendants: async (req, res, next) => {
    try {
      const UserId = req.params.id
      const month = req.query.month || ''
      const selectMonth = {}
      if (month) selectMonth.month = month
      
      //頁碼
      const DEFAULT_LIMIT = 11
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      
    
      let attendants = await Attendant.findAndCountAll({
        include: [{ model: Calendar, where: selectMonth }],
        where: { UserId },
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        nest: true,
        raw: true
      })


    let data = attendants.rows.map(att => {
        return {
          id: att.id,
          date: att.Calendar.date,
          week: att.Calendar.week,
          checkIn: att.checkIn,
          checkOut: att.checkOut,
          description: att.Calendar.description,
          isHoliday: att.Calendar.isHoliday,
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

      errStrategies.errorMsg(!attendants, '無法操作此項目', 401)

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
