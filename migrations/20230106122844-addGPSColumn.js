'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users',
      'is_distance',
      {
        type: Sequelize.BOOLEAN
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users',
      'is_distance')
  }
};