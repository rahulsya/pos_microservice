const { Order } = require("../models");
const sequelize = require("sequelize");

const index = async (req, res) => {
  try {
    const { month } = req.query;
    const date = new Date();
    const newMonth = date.getMonth() + 1;

    let filter = {
      month: newMonth,
    };

    if (month) {
      filter = { ...filter, month: new Date(month).getMonth() + 1 };
    }

    const totalRevenueOrder = await Order.sum("total_price", {
      where: filterBymonth("created_at", filter?.month),
    });
    const totalOrder = await Order.count({
      where: filterBymonth("created_at", filter?.month),
    });

    return res.json({
      status: "success",
      revenue: totalRevenueOrder,
      totalOrder,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const filterBymonth = (column_name, month) =>
  sequelize.where(sequelize.fn("month", sequelize.col(column_name)), month);
module.exports = { index };
