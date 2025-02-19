const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    return res.status(404).send("Campground not found");
  }
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Successfully Review Added");

  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  try {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Successfully Review Deleted");

    res.redirect(`/campgrounds/${id}`);
  } catch (err) {
    console.error("Review deletion error:", err.message);
    res.status(500).send(`Error deleting review: ${err.message}`);
  }
};
