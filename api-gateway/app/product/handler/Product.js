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
    // console.log(error);
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

const update = async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("stock", stock);
    form.append("category_id", category_id);
    console.log(form);
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
    const { status, data } = error.response;
    return res.status(status).json(data);
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
module.exports = { index, store, update, destroy };
