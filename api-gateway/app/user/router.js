const router = require("express").Router();
const multer = require("multer");
const { Register, Login, AllUsers, Logout, Update } = require("./handler");
const verifyToken = require("../VerifyToken");

router.post("/register", multer().none(), Register);
router.post("/login", multer().none(), Login);
router.put("/update", verifyToken, multer().none(), Update);
router.post("/logout", verifyToken, multer().none(), Logout);
router.get("/all", verifyToken, AllUsers);
router.get("/", verifyToken, (req, res) => {
  return res.json({
    data: req.user,
  });
});
module.exports = router;