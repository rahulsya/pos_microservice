const { Order, OrderItems } = require("../models");

const FormatInvoiceNumber = () => {
  let Newdate = new Date();
  const day = Newdate.getDay();
  const date = Newdate.getDate();
  const mounth = Newdate.getMonth();
  const second = Newdate.getSeconds();
  const invoiceNumber = `${day}${date}${mounth}${second}${Math.floor(
    Math.random() * Math.pow(10, 3)
  )}`;
  return invoiceNumber;
};

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

const order = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      include: OrderItems,
    });
    return res.json({
      status: "success",
      order,
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
    const {
      products,
      total_amount,
      total_shipping,
      courier_service,
      shipping_estimation,
      user_id,
    } = req.body;
    const invoinceNumber = FormatInvoiceNumber();
    const order = await Order.create({
      user_id: 1,
      invoice_number: invoinceNumber,
      total_shipping,
      total_price: total_amount,
      courier_service,
      shipping_estimation,
      payment_status: "PROCESS",
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
      message: "order created",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { index, store, order };
