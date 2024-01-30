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


module.exports = {
  isNotPair,
  Calendars
}
