const { Order, OrderItems } = require("../models");
const { Op, fn, col, where } = require("sequelize");

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
    const {
      invoice_number = "",
      status = "",
      date = "",
      user_id = "",
      month = "",
    } = req.query;

    let criteria = {};
    if (date) {
      criteria = {
        ...criteria,
        createdAt: { [Op.gte]: new Date(date) },
      };
    }
    if (status !== "all") {
      criteria = { ...criteria, status };
    }

    if (user_id) {
      criteria = { ...criteria, user_id };
    }
    if (invoice_number) {
      criteria = { ...criteria, invoice_number };
    }
    if (month) {
      getMonth = new Date(month).getMonth() + 1;
      criteria = {
        ...criteria,
        createdAt: where(fn("month", col("created_at")), getMonth),
      };
    }

    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      where: criteria,
    });
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
      address_id,
      payment_id,
      total_amount,
      total_shipping,
      courier_service,
      shipping_estimation,
      user_id,
      payment_method,
      shipping_destination,
      payment_status,
      status,
    } = req.body;
    const invoinceNumber = FormatInvoiceNumber();
    const order = await Order.create({
      user_id: user_id,
      address_id,
      payment_id,
      invoice_number: invoinceNumber,
      total_shipping,
      total_price: total_amount,
      courier_service,
      shipping_estimation,
      shipping_destination,
      payment_status: payment_status ? payment_status : "PROCESS",
      status: status ? status : "PROCESS",
      payment_method,
    });

    if (order) {
      await OrderItems.bulkCreate(
        products.map((item) => ({
          product_id: item.id,
          order_id: order.id,
          quantity: item.qty,
          item_price: item.price,
        }))
      );
    }

    return res.json({
      status: "success",
      message: "order created",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const getOrder = await Order.findByPk(req.params.id);
    if (!getOrder) {
      return res
        .status(404)
        .json({ status: "error", message: "Order Not Found" });
    }

    await Order.update(req.body, {
      where: {
        id: getOrder.id,
      },
    });

    const order = await Order.findByPk(getOrder.id);
    return res.json({
      status: "success",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { index, store, order, update };
