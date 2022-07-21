"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Max Decal 7300 - G058 Aqua Blue Transparant /m",
          image_url: "images/product 1.jpg",
          price: 15000,
          amount_stock: 100,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Max Decal 7300 - G031 Red Transparant /m",
          image_url: "images/product 2.jpg",
          price: 15000,
          amount_stock: 100,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Max Decal 7300 - 073 Dark Grey Transparant /m",
          image_url: "images/product1.jpg",
          price: 23000,
          amount_stock: 100,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Max Decal 9700 - M370 Matt Carbon /m",
          image_url: "images/product5.jpg",
          price: 23000,
          amount_stock: 100,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Max Decal 9500 - C6D15 Carbon 6D Black /m",
          image_url: "images/product6.jpg",
          price: 50000,
          amount_stock: 100,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Max Decal 9500 - MH02 Mirror Chrome Gold /m",
          image_url: "images/product 7.jpg",
          price: 50000,
          amount_stock: 100,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC585 Matte Chrome Lemon Yellow /m",
          image_url: "images/product 8.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC573 Matte Chrome Gold /m",
          image_url: "images/product 9.jpg",
          price: 23000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC577 Matte Chrome Tiffany /m",
          image_url: "images/product 10.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC575 Matte Chrome Green /m",
          image_url: "images/product 11.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC578 Matte Chrome Orange /m",
          image_url: "images/product 12.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC583 Matte Chrome Light Blue /m",
          image_url: "images/product 13.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC572 Matte Chrome Light Red /m",
          image_url: "images/product 14.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fanchi FC574 Matte Chrome Purple /m",
          image_url: "images/product 15.jpg",
          price: 145000,
          amount_stock: 100,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 061 Green /m",
          image_url: "images/product 16.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 091 Gold /m",
          image_url: "images/product 17.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracel 615 - 052 Azure Blue /m",
          image_url: "images/product 188888.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 035 Pastel Orange /m",
          image_url: "images/product 19.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 084 Sky Blue /m",
          image_url: "images/product 20.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 031 Red /m",
          image_url: "images/product 21.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 070 Black /m",
          image_url: "images/product 22.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 073 Dark Grey /m",
          image_url: "images/product 23.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 090 Silver /m",
          image_url: "images/product 24.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 071 Light Grey /m",
          image_url: "images/product 25.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oracal 651 - 020 Golden Yellow /m",
          image_url: "images/product 26.jpg",
          price: 73000,
          amount_stock: 100,
          category_id: 4,
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
