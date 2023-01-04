'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      week: {
        type: Sequelize.STRING
      },
      check_in: {
        type: Sequelize.BIGINT
      },
      check_out: {
        type: Sequelize.BIGINT
      },
      description: {
        type: Sequelize.STRING
      },
      is_holiday: {
        type: Sequelize.BOOLEAN
      },
      is_absense: {
        type: Sequelize.BOOLEAN
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendants');
  }
};