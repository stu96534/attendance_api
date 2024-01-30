const { User, Calendar, Calendars2024 } = require('../models')
const { GMT_3 } = require('../helpers/helpers')

const Calendars = {
  "2023": {
    "name": "Calendar",
    "model": Calendar
  },
  "2024": {
    "name": "Calendars2024",
    "model": Calendars2024
  }
}


const isNotPair = (value1, value2) => {
  if (value1 !== value2) return true
}

const getCalendarId = async (dateValue) => {
  
  const year = new Date(dateValue).getFullYear().toString()
  const CalendarModel = Calendars[year].model

  const CalendarDate = await CalendarModel.findOne({
    where: {
      date: GMT_3(dateValue)
    },
    raw: true,
  })

  return CalendarDate.id
}

const getUserId = async (userName) => {
  const user = await User.findOne({
    where: {
      account: userName
    },
    raw: true
  })
  return user.id
}


module.exports = {
  isNotPair,
  getCalendarId,
  getUserId,
  Calendars
}
