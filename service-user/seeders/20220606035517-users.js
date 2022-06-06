"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "rahul",
          email: "rahul@email.com",
          password: bcrypt.hashSync("qwerty12", 10),
          phone_number: "085718927573",
          role: "customer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "admin",
          email: "admin@email.com",
          password: "qwerty12",
          password: bcrypt.hashSync("qwerty12", 10),
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
