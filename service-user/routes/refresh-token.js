const router = require("express").Router();
const multer = require("multer");
const { RefreshTokenController } = require("../controller/");

router.post("/", multer().none(), RefreshTokenController.CreateToken);
router.get("/", RefreshTokenController.GetToken);

module.exports = router;
