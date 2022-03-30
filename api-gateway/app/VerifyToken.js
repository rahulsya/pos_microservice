const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: err.message,
      });
    }
    // console.log(decode);
    req.user = decode;
    next();
  });
};
