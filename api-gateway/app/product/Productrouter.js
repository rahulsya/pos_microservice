const router = require("express").Router();
const multer = require("multer");
const { Categories, Product } = require("./handler");
const os = require("os");
router.get("/", Product.index);
router.get("/:id", Product.product);
router.post("/", multer({ dest: os.tmpdir() }).single("image"), Product.store);
router.put(
  "/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  Product.update
);
router.put("/stock/:id", multer().none(), Product.updateStock);
router.delete("/:id", Product.destroy);

module.exports = router;