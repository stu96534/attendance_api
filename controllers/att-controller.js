const { Attendant } = require('../models')
const { GMT_3 } = require('../helpers/helpers')
const date2023 = require('../config/2023.json')



const attController = {
  addAttendant: async (req, res, next) => {
    try {
      const date = req.body.date
      const UserId = req.params.id

      if(UserId !== req.user.id) {
        return res.status(401).json({
          status: 'error',
          message: '無法使用該帳號！'
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
          checkIn: date
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
            isAbsense: true
          })
        } else {
          await attendant.update({
            isAbsense: false
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

  }
}

module.exports = attController
