const router = require("express").Router();
const multer = require("multer");
const { Categories, Product } = require("./handler");
const os = require("os");

router.get("/", Product.index);
router.post("/", multer({ dest: os.tmpdir() }).single("image"), Product.store);
router.put(
  "/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  Product.update
);
router.delete("/:id", Product.destroy);
// categories router
router.get("/category", Categories.index);
router.post("/category", multer().none(), Categories.store);
router.put("/category/:id", multer().none(), Categories.update);
router.delete("/category/:id", Categories.destroy);

module.exports = router;
