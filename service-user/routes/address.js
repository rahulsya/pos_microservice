const express = require("express");
const router = express.Router();
const multer = require("multer");
const { AddressController } = require("../controller");

router.get("/:id", AddressController.index);
router.post("/", multer().none(), AddressController.store);
router.put("/:id", multer().none(), AddressController.update);
router.delete("/:id", multer().none(), AddressController.destroy);

module.exports = router;
