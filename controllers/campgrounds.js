const { model } = require("mongoose");
const Campground = require("../models/campground");
const campground = require("../models/campground");
const { cloudinary } = require("../cloudinary/index");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.new = async (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCamp = async (req, res, next) => {
  // if (!req.body.campground) throw new ExpressError("Invalid Data", 400);
  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 }
  );
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.features[0].geometry;
  req.files.map((f) => ({ url: f.path, filename: f.filename }));
  // const campground = new Campground(req.body.campground);
  // campground.geometry = geoData.features[0].geometry;
  campground.image = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();

  req.flash("success", "Successfully created new camp");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.getCampgrounds = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Invalid camp ");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.showCamps = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit", { campground });
};

module.exports.updateCamps = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  const camp = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 }
  );
  campground.geometry = geoData.features[0].geometry;
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  camp.image.push(...imgs);
  await camp.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await camp.updateOne({
      $pull: { image: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully Updated Camp");
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCamp = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully Camp deleted");
  res.redirect("/campgrounds");
};
