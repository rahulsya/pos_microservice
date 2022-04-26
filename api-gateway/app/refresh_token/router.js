const router = require("express").Router();
const multer = require("multer");
const RefreshToken = require("./handler/refresh_token");

router.post("/", multer().none(), RefreshToken);

module.exports = router;
