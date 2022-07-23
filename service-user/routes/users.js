var express = require("express");
var router = express.Router();

// controller
const { UserController } = require("../controller");
const multer = require("multer");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/all", UserController.GetAllUser);
router.get("/:id", UserController.GetUser);
router.post("/create", multer().none(), UserController.Register);
router.put("/update/:id", multer().none(), UserController.Update);
router.post("/login", multer().none(), UserController.Login);
router.post("/logout", multer().none(), UserController.Logout);
router.post("/forget-password", multer().none(), UserController.GetUserByEmail);
module.exports = router;
