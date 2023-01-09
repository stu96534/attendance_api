'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Attendants',
      'is_attendant',
      {
        type: Sequelize.BOOLEAN
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Attendants',
      'is_attendant')
  }
};