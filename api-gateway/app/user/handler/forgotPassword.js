const apiAdapter = require("../../ApiAdapter");
const { URL_SERVICE_USER, JWT_SECRET, MAIL_API_KEY, URL_CLIENT_APP } =
  process.env;
const api = apiAdapter(URL_SERVICE_USER);
const jwt = require("jsonwebtoken");
const { createTransport } = require("nodemailer");

const requestEmail = async (req, res) => {
  try {
    // await
    const getUser = await api.post("/users/forget-password", req.body);
    const token = jwt.sign(getUser.data.data, JWT_SECRET, { expiresIn: "3d" });

    let mailTrasporter = createTransport({
      service: "gmail",
      auth: {
        user: "rahulsyaban666@gmail.com",
        pass: MAIL_API_KEY,
      },
    });

    let mailDetails = {
      from: "rahulsyaban666@gmail.com",
      to: req.body.email,
      subject: "Reset Password Account POS Microservices",
      html: `
            <h2>Hi, ${req.body.email.split("@")[0]}</h2>
            <h3>Pos microservice</h3>
            </hr>
            <p>You have requested your password to be reset. Please click the following link to change your password:</p>
            <a style="font-size:15px;line-height: 15px;color: #fff;background: #00a2db;text-decoration: none;padding: 12px 28px;margin: 18px 0" href="${URL_CLIENT_APP}/reset-password/${token}">Reset Password</a>
            <p>or copy this link</p>
            <a>${URL_CLIENT_APP}/reset-password/${token}</a>
            <br/>
            <p>If you did not request this, please ignore this email</p>
            <br/>
            <p>thanks, Pos microservices,</p>

        `,
    };

    mailTrasporter.sendMail(mailDetails, function (err, info) {
      if (err) {
        res.json(err);
      } else {
        return res.json({
          status: "success",
          message: "reqquest reset password success check your email",
          //   token,
        });
      }
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

const updatePassword = async (req, res) => {
  try {
    const token = req.body.token;
    const password = req.body.password;
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          message: err.message,
        });
      }

      api
        .put(`/users/update/${decode.id}`, { password })
        .then((response) => {
          return res.json({
            status: "success",
            message: "success reset password",
          });
        })
        .catch((err) => {
          return res.json(err);
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
module.exports = { requestEmail, updatePassword };
