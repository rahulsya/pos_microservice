const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const { productController, ProductstockController } = require("../controller");

router.get("/", productController.index);
router.get("/count", ProductstockController.countProduct);
router.get("/product_orders", productController.productsById);
router.get("/:id", productController.product);
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
router.post(
  "/stock",
  multer().none(),
  ProductstockController.manageProductStock
);

module.exports = router;
