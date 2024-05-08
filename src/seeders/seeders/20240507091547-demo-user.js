'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
  
    */

     await queryInterface.bulkInsert('user', [{
      email: 'John Doe',
      password :'123',
      username: 'fa'
    },
    {
      email: 'John Doe2',
      password :'123',
      username: 'fa2'
    },
    {
      email: 'John Doe3',
      password :'123',
      username: 'fa3'
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
