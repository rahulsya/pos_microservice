const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../VerifyToken");
const { intiatePayment, checkStatus } = require("./paymentController");

router.get("/:id", verifyToken, checkStatus);
router.post("/transaction", verifyToken, intiatePayment);

module.exports = router;
