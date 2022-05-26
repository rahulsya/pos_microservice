const router = require("express").Router();
const multer = require("multer");
const { intiatePayment } = require("./paymentController");

router.post("/transaction", multer().none(), intiatePayment);

module.exports = router;
