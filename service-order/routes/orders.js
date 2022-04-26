const router = require("express").Router();
const multer = require("multer");
const { index, store } = require("../controller/OrderController");

router.get("/", index);
router.post("/", multer().none(), store);

module.exports = router;
