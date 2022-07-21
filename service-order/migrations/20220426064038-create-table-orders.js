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
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      payment_id: {
        allowNull: true,
        type: Sequelize.STRING(25),
      },
      courier_number: {
        type: Sequelize.INTEGER(30),
        allowNull: true,
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
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      shipping_estimation: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      shipping_destination: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
      payment_status: {
        values: ["SUBMIT", "PROCESS", "SUCCESS", "CANCEL"],
        type: Sequelize.ENUM,
        defaultValue: "PROCESS",
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM,
        values: ["CASH", "NONCASH"],
        allowNull: false,
      },
      status: {
        values: ["SUBMIT", "PROCESS", "CANCEL", "SUCCESS"],
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
