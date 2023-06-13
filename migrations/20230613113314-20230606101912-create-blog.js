'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('blogs', 'blogCategoryId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_categories',
          id: 'id'
        }
      }
    );
  }, 
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('blogs', 'blogCategoryId');
  }
};
