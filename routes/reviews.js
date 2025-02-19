const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const Review = require("../controllers/review.js");
const { reviewSchema } = require("../schemas.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const review = require("../models/review.js");

router.post("/", validateReview, isLoggedIn, catchAsync(Review.createReview));

router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(Review.deleteReview)
);

module.exports = router;
