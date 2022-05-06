require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const usersRouter = require("./app/user/router");
const refreshToken = require("./app/refresh_token/router");
const productRouter = require("./app/product/router");
const couriersRouter = require("./app/couriers/router");
const cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/users", usersRouter);
app.use("/refresh_token", refreshToken);
app.use("/products", productRouter);
app.use("/courier", couriersRouter);
module.exports = app;
