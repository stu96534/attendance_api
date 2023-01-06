'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [{
      name: "鈦坦高雄分公司",
      latitube: 22.639467558656893,
      longitube: 120.3274116709897,
      is_choose: true,
      created_at: new Date(),
      updated_at: new Date()
    },
      {
        name: "當前位置",
        latitube: 0,
        longitube: 0,
        is_choose: false,
        created_at: new Date(),
        updated_at: new Date()
      }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {});
  }
};
