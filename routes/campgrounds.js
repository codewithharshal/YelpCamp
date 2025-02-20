const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { campgroundSchema } = require("../schemas.js");
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware.js");

const campgrounds = require("../controllers/campgrounds.js");
const multer = require("multer");
const { storage } = require("../cloudinary/index.js");
const upload = multer({ storage });

router
  .route("/")
  .get(isLoggedIn, catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image", 3),
    validateCampground,
    catchAsync(campgrounds.createCamp)
  );

router.get("/new", isLoggedIn, campgrounds.new);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(campgrounds.getCampgrounds))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image", 3),
    validateCampground,
    catchAsync(campgrounds.updateCamps)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.showCamps)
);

module.exports = router;
