const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../VerifyToken");
const { intiatePayment } = require("./paymentController");

router.post("/transaction", verifyToken, intiatePayment);

module.exports = router;
