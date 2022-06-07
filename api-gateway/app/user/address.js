const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../VerifyToken");
const {
  index,
  update,
  store,
  destroy,
  DetailAddress,
} = require("./handler/address");

router.get("/", verifyToken, index);
router.get("/detail/:id", DetailAddress);
router.post("/", verifyToken, multer().none(), store);
router.put("/:id", verifyToken, multer().none(), update);
router.delete("/:id", verifyToken, destroy);

module.exports = router;
