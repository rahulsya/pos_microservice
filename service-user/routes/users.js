var express = require("express");
var router = express.Router();

// controller
const { UserController } = require("../controller");
const multer = require("multer");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/create", multer().none(), UserController.Register);

module.exports = router;
