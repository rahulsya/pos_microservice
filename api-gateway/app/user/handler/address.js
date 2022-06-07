const apiAdapter = require("../../ApiAdapter");

const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

const index = async (req, res) => {
  try {
    const address = await api.get(`/address/${req.user?.id}`);
    const { data } = address;
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
    const address = await api.post(`/address`, {
      ...req.body,
      user_id: req.user?.id,
    });
    return res.json(address.data);
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
    const update = await api.put(`/address/${req.params.id}`, req.body);
    return res.json(update.data);
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
    const destroy = await api.delete(`/address/${req.params.id}`);
    return res.json(destroy.data);
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

const DetailAddress = async (req, res) => {
  try {
    const address = await api.get(`/address/detail/${req.params.id}`);
    return res.json(address.data);
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

module.exports = {
  index,
  store,
  update,
  destroy,
  DetailAddress,
};
