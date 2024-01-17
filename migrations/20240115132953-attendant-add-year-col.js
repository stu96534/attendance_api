'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Attendants',
      'year',
      {
        type: Sequelize.STRING
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Attendants',
      'year')
  }
};
