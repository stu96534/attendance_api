'use strict';
const att2023 = require('../config/2023att.json')
const seedId = require('../config/seedId.json')
const { getCalendarId, getUserId} = require('../middleware/funcTools')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Attendants', Array.from({ length: att2023.length }).map((_, i) => ({
      check_in: new Date(att2023[i].checkIn).valueOf(),
      check_out: new Date(att2023[i].checkOut).valueOf(),
      is_absense: att2023[i].isAbsense,
      user_id: seedId[i].userId,
      calendar_id: seedId[i].calendarId,
      is_attendant: att2023[i].isAttendant,
      year: att2023[i].year,
      created_at: new Date(),
      updated_at: new Date()
    })))

    await queryInterface.bulkInsert('Attendants', Array.from({ length: att2023.length }).map((_, i) => ({
      check_in: new Date(att2023[i].checkIn).valueOf(),
      check_out: new Date(att2023[i].checkOut).valueOf(),
      is_absense: att2023[i].isAbsense,
      user_id: seedId[att2023.length + i].userId,
      calendar_id: seedId[att2023.length + i].calendarId,
      is_attendant: att2023[i].isAttendant,
      year: att2023[i].year,
      created_at: new Date(),
      updated_at: new Date()
    }))
    , {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Attendants', null, {});

  }
};
