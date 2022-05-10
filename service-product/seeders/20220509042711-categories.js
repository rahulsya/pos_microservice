"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Material Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cutting Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carbon Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Vinil Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
