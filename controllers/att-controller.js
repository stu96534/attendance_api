const { Attendant } = require('../models')
const { GMT_3, timestampTransformHours } = require('../helpers/helpers')
const errStrategies = require('../middleware/apiError')
const { isNotPair } = require('../middleware/funcTools')



const attController = {
  addAttendant: async (req, res, next) => {
    try {
      const { date } = req.body
      const UserId = req.params.id
      const userId = req.user.id

      errStrategies.errorMsg(isNotPair(Number(id), Number(userId)), '無法編輯此用戶！', 403)


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
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = attController
