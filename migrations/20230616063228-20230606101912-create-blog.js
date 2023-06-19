'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('blogs', 'image', {
      type: Sequelize.STRING
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('blogs', 'image');
  }
};
