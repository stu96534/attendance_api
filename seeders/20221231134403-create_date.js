'use strict';
const { dateStr } = require('../helpers/helpers')
const date2023 = require('../config/2023.json')
const Str2023 = date2023.map(d => ({
  date: dateStr(d.date),
  week: d.week,
  description: d.description,
  is_holiday: d.isHoliday,
  month: new Date(dateStr(d.date)).getMonth() + 1,
  is_absense: false
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query("SELECT id FROM Users",
      {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })

   

    await queryInterface.bulkInsert('Attendants', Array.from({ length: date2023.length * users.length }).map((_, i) => ({
      user_id: users[Math.floor( i / 365)].id,
      date: Str2023[ i - (Math.floor(i / 365)*365)].date,
      month: Str2023[i - (Math.floor(i / 365) * 365)].month,
      week: Str2023[i - (Math.floor(i / 365) * 365)].week,
      description: Str2023[i - (Math.floor(i / 365) * 365)].description,
      is_holiday: Str2023[i - (Math.floor(i / 365) * 365)].is_holiday,
      is_absense: false,
      is_attendant: false,
      created_at: new Date(),
      updated_at: new Date()
    })
    ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Attendants', null, {});
  }
};
