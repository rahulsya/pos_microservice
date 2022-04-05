const express = require("express");
const router = express.Router();
const multer = require("multer");
const { categoryController } = require("../controller");

router.get("/", categoryController.allCategories);
router.post("/", multer().none(), categoryController.create);
router.put("/:id", multer().none(), categoryController.update);
router.delete("/:id", multer().none(), categoryController.destroy);

module.exports = router;
