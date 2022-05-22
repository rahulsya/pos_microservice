const apiAdapter = require("../../ApiAdapter");
const FormData = require("form-data");
const fs = require("fs");

const { URL_SERVICE_PRODUCT } = process.env;
const api = apiAdapter(URL_SERVICE_PRODUCT);

const index = async (req, res) => {
  try {
    const product = await api.get("/product");
    const { data } = product;
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

const product = async (req, res) => {
  try {
    const product = await api.get(`/product/${req.params.id}`);
    const { data } = product;
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

const store = async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("stock", stock);
    form.append("category_id", category_id);
    form.append(
      "image",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    const product = await api.post("/product", form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    const { data } = product;
    return res.json(data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    // const { status, data } = error.response;
    return res.status(400).json({ status: "error", message: "internal Error" });
  }
};

const update = async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("amount_stock", stock);
    form.append("category_id", category_id);
    if (req.file) {
      form.append(
        "image",
        fs.createReadStream(req.file.path),
        req.file.originalname
      );
    }
    // should fix this
    const product = await api.put(`/product/${req.params.id}`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    const { data } = product;
    return res.json(data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavaiable" });
    }
    // const { status, data } = error.response;
    // return res.status(status).json(data);
    return res.status(400).json({ status: "error", message: "internal Error" });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await api.delete(`/product/${req.params.id}`);
    const { data } = product;
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

const updateStock = async (req, res) => {
  try {
    const { payload } = req.body;

    const updateStockProduct = await api.post(`/product/stock`, { payload });
    const { data } = updateStockProduct;
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
module.exports = { index, store, update, destroy, updateStock, product };
