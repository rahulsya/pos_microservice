const router = require("express").Router();
const { index } = require("../controller/ReportsController");

router.get("/", index);

module.exports = router;
