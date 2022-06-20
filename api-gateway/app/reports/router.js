const router = require("express").Router();
const { index } = require("./ReportController");

router.get("/", index);

module.exports = router;
