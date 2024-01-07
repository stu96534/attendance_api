'use strict';
const { dateStr } = require('../helpers/helpers')
const date2024 = require('../config/2024.json')
const Str2024 = date2024.map(d => ({
  date: dateStr(d.date),
  week: d.week,
  description: d.description,
  is_holiday: d.isHoliday,
  month: new Date(dateStr(d.date)).getMonth() + 1
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Calendars2024s', Array.from({ length: date2024.length }).map((_, i) => ({
      date: Str2024[i].date,
      month: Str2024[i].month,
      week: Str2024[i].week,
      description: Str2024[i].description,
      is_holiday: Str2024[i].is_holiday,
      created_at: new Date(),
      updated_at: new Date()
    })
    ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Calendars2024s', null, {});
  }
};

