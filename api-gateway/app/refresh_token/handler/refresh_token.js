const apiAdapter = require("../../ApiAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);
module.exports = async (req, res) => {
  try {
    const { email, refresh_token } = req.body;
    if (!refresh_token || !email) {
      return res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }

    await api.get("/refresh_token", {
      params: { refresh_token },
    });

    jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (error, decode) => {
      if (error) {
        return res.status(403).json({
          status: "error",
          message: error.message,
        });
      }

      if (email !== decode.data.email) {
        return res.status(400).json({
          status: "error",
          message: "email is invalid",
        });
      }

      const token = jwt.sign(decode.data, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      return res.json({
        status: "success",
        token,
      });
    });
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
