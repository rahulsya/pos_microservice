const apiAdapter = require("../../ApiAdapter");

const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);
module.exports = async (req, res) => {
  try {
    const logout = await api.post("/users/logout", { user_id: req.user.id });

    return res.json(logout.data);
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
