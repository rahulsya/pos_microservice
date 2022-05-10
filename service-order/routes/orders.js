const router = require("express").Router();
const multer = require("multer");
const { index, store, order } = require("../controller/OrderController");

router.get("/", index);
router.get("/:id", order);
router.post("/", multer().none(), store);

module.exports = router;
