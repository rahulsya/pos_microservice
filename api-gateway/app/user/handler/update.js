const apiAdapter = require("../../ApiAdapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const update = await api.put(`users/update/${req.user.id}`, req.body);
    const { data } = update;
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
