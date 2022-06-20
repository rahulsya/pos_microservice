const apiAdapter = require("../ApiAdapter");

const { URL_SERVICE_ORDER } = process.env;
const api = apiAdapter(URL_SERVICE_ORDER);

const index = async (req, res) => {
  try {
    const report = await api.get("/reports", { params: { ...req.query } });

    return res.json(report.data);
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

module.exports = { index };
