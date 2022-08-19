'use strict';
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await db.authors_books.bulkCreate([
      {
        author_id: 1,
        book_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        book_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 2,
        book_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
