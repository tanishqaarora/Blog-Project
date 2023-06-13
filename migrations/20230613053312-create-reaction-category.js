'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reaction_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: 'reactions',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      reaction_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reaction_categories');
  }
};