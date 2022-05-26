const router = require("express").Router();
const multer = require("multer");
const {
  index,
  store,
  order,
  update,
} = require("../controller/OrderController");

router.get("/", index);
router.get("/:id", order);
router.post("/", multer().none(), store);
router.put("/:id", multer().none(), update);

module.exports = router;
