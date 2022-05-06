require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const axios = require("axios");

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = process.env.RAJA_ONGKIR_API;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

router.get("/provinsi", (req, res) => {
  axios
    .get("/province")
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        data: err,
      });
    });
});

router.get("/kota/:provId", (req, res) => {
  const id = req.params.provId;
  axios
    .get(`/city?province=${id}`)
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        data: err,
      });
    });
});

router.post("/ongkir", multer().none(), (req, res) => {
  const data = req.body;
  axios
    .post("/cost", data)
    .then((response) => res.json(response.data))
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        data: error.message,
      });
    });
});

module.exports = router;
