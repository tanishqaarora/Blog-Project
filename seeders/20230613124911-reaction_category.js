'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reaction_categories',[{
      reaction_type: 'like',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      reaction_type: 'dislike',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reaction_categories', null, {});
  }
};
