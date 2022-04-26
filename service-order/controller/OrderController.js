const { Order, OrderItems } = require("../models");

const index = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const store = async (req, res) => {
  try {
    const { products, total_amount, total_shipping } = req.body;

    console.log(req.body);
    const order = await Order.create({
      user_id: 1,
      invoice_number: "2020042678",
      total_shipping: total_shipping,
      total_price: total_amount,
      courier_service: null,
      status: "PROCESS",
    });

    if (order) {
      await OrderItems.bulkCreate(
        products.map((item) => ({
          product_id: item.id,
          order_id: order.id,
          quantity: item.qty,
        }))
      );
    }

    return res.json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { index, store };
