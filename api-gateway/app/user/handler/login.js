const apiAdapter = require("../../ApiAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);
module.exports = async (req, res) => {
  try {
    const login = await api.post("/users/login", req.body);
    const { data } = login.data;

    // create token
    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    // create refresh Token
    // store data to refreshtoken
    const refresh_token = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post("/refresh_token", {
      user_id: data.id,
      refresh_token,
    });

    return res.json({
      status: "success",
      token,
      refresh_token,
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
