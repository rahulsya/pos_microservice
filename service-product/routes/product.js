const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const { productController } = require("../controller");

router.get("/", productController.index);
router.post(
  "/",
  multer({ dest: os.tmpdir() }).single("image"),
  productController.create
);
router.put(
  "/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  productController.update
);
router.delete("/:id", productController.destroy);

module.exports = router;
