const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../VerifyToken");
const {
  createOrder,
  orderDetail,
  order,
  updateOrder,
} = require("./handler/Order");

router.post("/", multer().none(), createOrder);
router.get("/", verifyToken, order);
router.get("/:id", orderDetail);
router.put("/:id", multer().none(), updateOrder);

module.exports = router;
