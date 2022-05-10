"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage2.jpg",
          price: 11000,
          amount_stock: 23,
          category_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage.jpg",
          price: 12000,
          amount_stock: 24,
          category_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage2.jpg",
          price: 13000,
          amount_stock: 25,
          category_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage.jpg",
          price: 14000,
          amount_stock: 26,
          category_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage2.jpg",
          price: 15000,
          amount_stock: 27,
          category_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage.jpg",
          price: 16000,
          amount_stock: 28,
          category_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage2.jpg",
          price: 17000,
          amount_stock: 29,
          category_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Maxdecal Max decal 7200",
          image_url: "images/dummyimage.jpg",
          price: 18000,
          amount_stock: 30,
          category_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
