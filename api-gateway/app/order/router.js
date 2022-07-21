const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../VerifyToken");
const {
  createOrder,
  orderDetail,
  order,
  updateOrder,
} = require("./handler/Order");

router.post("/", verifyToken, multer().none(), createOrder);
router.get("/", verifyToken, order);
router.get("/:id", verifyToken, orderDetail);
router.put("/:id", verifyToken, multer().none(), updateOrder);

module.exports = router;
