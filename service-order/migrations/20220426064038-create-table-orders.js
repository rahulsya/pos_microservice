"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      invoice_number: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      total_shipping: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courier_service: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      status: {
        values: ["SUBMIT", "PROCESS", "COMPLETED", "CANCEL"],
        type: Sequelize.ENUM,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
