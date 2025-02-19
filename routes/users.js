const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { model } = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.registerpage)
  .post(catchAsync(users.createAccount));

router
  .route("/login")
  .get(users.loginpage)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.loginAuth
  );

router.get("/logout", users.logout);

module.exports = router;
