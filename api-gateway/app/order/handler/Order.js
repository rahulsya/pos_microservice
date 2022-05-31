const apiAdapter = require("../../ApiAdapter");

const { URL_SERVICE_ORDER } = process.env;
const api = apiAdapter(URL_SERVICE_ORDER);

const order = async (req, res) => {
  try {
    const order = await api.get(`/order`, { params: req.query });
    return res.json(order.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

const orderDetail = async (req, res) => {
  try {
    const order = await api.get(`/order/${req.params.id}`);
    return res.json(order.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

const createOrder = async (req, res) => {
  try {
    const create_order = await api.post(`/order`, req.body);
    const { data } = create_order;
    return res.json(data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

module.exports = { createOrder, order, orderDetail };
