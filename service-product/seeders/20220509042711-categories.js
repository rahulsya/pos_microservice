"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id:1,
          name: "Material Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id:2,
          name: "Cutting Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id:3,
          name: "Carbon Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id:4,
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
