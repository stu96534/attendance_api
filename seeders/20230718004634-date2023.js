'use strict';
const { dateStr } = require('../helpers/helpers')
const date2023 = require('../config/2023.json')
const Str2023 = date2023.map(d => ({
  date: dateStr(d.date),
  week: d.week,
  description: d.description,
  is_holiday: d.isHoliday,
  month: new Date(dateStr(d.date)).getMonth() + 1
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Calendars', Array.from({ length: date2023.length }).map((_, i) => ({
      date: Str2023[i].date,
      month: Str2023[i].month,
      week: Str2023[i].week,
      description: Str2023[i].description,
      is_holiday: Str2023[i].is_holiday,
      created_at: new Date(),
      updated_at: new Date()
    })
    ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Calendars', null, {});
  }
};
