const apiAdapter = require("../../ApiAdapter");

const { URL_SERVICE_PRODUCT } = process.env;
const api = apiAdapter(URL_SERVICE_PRODUCT);

const index = async (req, res) => {
  try {
    const categories = await api.get("/category");
    return res.json(categories.data);
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

const store = async (req, res) => {
  try {
    const data = req.body;
    const categories = await api.post("/category", data);
    return res.json(categories.data);
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

const update = async (req, res) => {
  try {
    const data = req.body;
    const categories = await api.put(`/category/${req.params.id}`, data);
    return res.json(categories.data);
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

const destroy = async (req, res) => {
  try {
    const categories = await api.delete(`/category/${req.params.id}`);
    return res.json(categories.data);
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

module.exports = { index, store, update, destroy };
