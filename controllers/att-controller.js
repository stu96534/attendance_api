const { Attendant, Location } = require('../models')
const { GMT_3 } = require('../helpers/helpers')



const attController = {
  addAttendant: async (req, res, next) => {
    try {
      const date = req.body.date
      const distance = req.body.distance
      const UserId = req.params.id
      const userId = req.user.id

      if (Number(UserId) !== Number(userId)) {
        return res.status(401).json({
          status: 'error',
          message: '無法使用該帳號！'
        })
      }

      if (distance > 400) {
        return res.status(401).json({
          status: 'error',
          message: `目前離公司${distance}公尺，無法打卡`
        })
      }

      let attendant = await Attendant.findOne({
        where: {
          UserId,
          date: GMT_3(date)
        }
      })

      if (!attendant.checkIn) {
        //上班打卡
        await attendant.update({
          checkIn: date,
          isAbsense: true
        })

        return res.status(200).json({
          status: 'success',
          message: '上班打卡成功'
        })
      } else {
        //下班打卡
        await attendant.update({
          checkOut: date
        })

        //若為上班日且上班未滿8小時，記缺勤
        const workHours = parseInt(parseInt(attendant.checkOut - attendant.checkIn) / 1000 / 60 / 60)

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
      }
    } catch (error) {
      next(error)
    }
  },
  getLocation: async (req, res, next) => {
    try {

      let location = await Location.findOne({
        where: { isChoose: true }
      })

      return res.status(200).json(location)

    } catch(err) {
      next(err)
    }
  }
}

module.exports = attController
