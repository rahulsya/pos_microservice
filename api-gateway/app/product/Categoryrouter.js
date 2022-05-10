const router = require("express").Router();
const multer = require("multer");
const { Categories } = require("./handler");

// categories router
router.get("/", Categories.index);
router.post("/", multer().none(), Categories.store);
router.put("/:id", multer().none(), Categories.update);
router.delete("/:id", Categories.destroy);
module.exports = router;
