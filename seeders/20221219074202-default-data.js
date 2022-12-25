'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker')
const password = 'titaner'
const adminPassword = 'tiadmin'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: faker.name.findName(),
      email: `root@example.com`,
      password: bcrypt.hashSync(adminPassword, bcrypt.genSaltSync(10), null),
      image: `https://loremflickr.com/320/240/people/?random=${Math.random() * 100}`,
      locked: false,
      err_count: 0,
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()

    }])

    await queryInterface.bulkInsert('Users', Array.from({ length: 20 }).map((_, i) => ({
      name: faker.name.findName(),
      email: `user${i+1}@example.com`,
      password:  bcrypt.hashSync(password, bcrypt.genSaltSync(10),null),
      image: `https://loremflickr.com/320/240/people/?random=${Math.random() * 100}`,
      locked: false,
      err_count: 0,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()

    })) ,{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
