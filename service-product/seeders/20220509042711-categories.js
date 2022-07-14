"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: 1,
          name: "Transparant Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Carbon Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Max Decal Sticker",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Oracal",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "Fanchi",
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
