const apiAdapter = require("../../ApiAdapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const users = await api.get("/users/all");
    const { data } = users;
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
