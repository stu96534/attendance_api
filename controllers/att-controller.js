const { Attendant } = require('../models')
const { GMT_3, timestampTransformHours } = require('../helpers/helpers')
const errStrategies = require('../middleware/apiError')
const { isNotPair, Calendars } = require('../middleware/funcTools')



const attController = {
  addAttendant: async (req, res, next) => {
    try {
      const { date } = req.body
      const UserId = req.params.id
      const userId = req.user.id

      const Calendar = Calendars["2024"]

      errStrategies.errorMsg(isNotPair(Number(UserId), Number(userId)), '無法編輯此用戶！', 403)

      const CalendarDate = await Calendar.findOne({
        where: {
          date: GMT_3(date)
        },
        raw: true,
      })

      const attendant = await Attendant.findOne({
        where: {
          UserId,
          CalendarId: CalendarDate.id
        }
      })

      errStrategies.errorMsg(attendant, '已打卡上班！', 401)

      //上班打卡
      await Attendant.create({
        checkIn: date,
        isAbsense: true,
        UserId,
        CalendarId: CalendarDate.id
      })

      return res.status(200).json({
        status: 'success',
        message: '上班打卡成功'
      })

    } catch (error) {
      next(error)
    }
  },
  putAttendant: async (req, res, next) => {
    try {
      const { date } = req.body
      const UserId = req.params.id
      const userId = req.user.id

      errStrategies.errorMsg(isNotPair(Number(UserId), Number(userId)), '無法編輯此用戶！', 403)

      const CalendarDate = await Calendar.findOne({
        where: {
          date: GMT_3(date)
        },
        raw: true,
      })

      const attendant = await Attendant.findOne({
        where: {
          UserId,
          CalendarId: CalendarDate.id
        }
      })

      errStrategies.errorMsg(!attendant, '尚未上班打卡！', 401)

      //下班打卡
      await attendant.update({
        checkOut: date
      })

      //若為上班日且上班未滿8小時，記缺勤
      const workHours = timestampTransformHours(attendant.checkIn, attendant.checkOut)

      if (workHours < 8 && !attendant.isHoliday) {
        await attendant.update({
          isAbsense: true,
          isAttendant: false
        })
      } else {
        await attendant.update({
          isAbsense: false,
          isAttendant: true
        })
      }

      return res.status(200).json({
        status: 'success',
        message: '下班打卡成功'
      })

    } catch (error) {
      next(error)
    }
  },
  getOneAttendent: async (req, res, next) => {
    try {
      const date = req.params.date
      const UserId = req.params.id
      const userId = req.user.id

      errStrategies.errorMsg(isNotPair(Number(UserId), Number(userId)), '無法編輯此用戶！', 403)

      const CalendarDate = await Calendar.findOne({
        where: {
          date: GMT_3(Number(date))
        },
        raw: true,
      })
      
      const attendant = await Attendant.findOne({
        where: {
          UserId,
          CalendarId: CalendarDate.id
        }
      })

      return res.status(200).json({
        attendant
      })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = attController
