const router = require("express").Router();
const multer = require("multer");
const RefreshToken = require("./handler/refresh_token");

router.get("/", multer().none(), RefreshToken);

module.exports = router;
