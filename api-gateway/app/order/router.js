const router = require("express").Router();
const multer = require("multer");
const { createOrder, orderDetail, order } = require("./handler/Order");

router.post("/", multer().none(), createOrder);
router.get("/", order);
router.get("/:id", orderDetail);

module.exports = router;
