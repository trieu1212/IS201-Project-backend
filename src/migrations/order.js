'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      totalPrice:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serviceId:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Order');
  }
};