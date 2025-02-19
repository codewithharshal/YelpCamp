if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverrid = require("method-override");
const ExpressError = require("./utils/ExpressError");
const reviews = require("./routes/reviews.js");
const campground = require("./routes/campgrounds.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const users = require("./routes/users.js");
const { log } = require("console");
const mongoSanitize = require("express-mongo-sanitize");
const { name } = require("ejs");
const helmet = require("helmet");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");

const AtlastDB =
  process.env.ATLAST_DB_URL || "mongodb://localhost:27017/YelpCampDatabase";
// const DBLOCAL = "mongodb://localhost:27017/YelpCampDatabase";
mongoose.connect(AtlastDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverrid("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());
app.use(helmet());

const store = MongoStore.create({
  mongoUrl: AtlastDB,
  crypto: {
    secret: "thisshouldbesecret",
  },
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Store error");
});

const sessionConfig = {
  store,
  name: "Session",
  secret: "thisshouldbesecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  // "https://api.tiles.mapbox.com/",
  // "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/", // add this
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  // "https://api.mapbox.com/",
  // "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/", // add this
];
const connectSrcUrls = [
  // "https://api.mapbox.com/",
  // "https://a.tiles.mapbox.com/",
  // "https://b.tiles.mapbox.com/",
  // "https://events.mapbox.com/",
  "https://api.maptiler.com/", // add this
];

const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dxauzebpd/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/",
        "https://api.maptiler.com/",
      ],

      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campground);
app.use("/campgrounds/:id/reviews", reviews);
app.use("/", users);

app.get("/", (req, res) => {
  res.render("Home");
});

app.all("*", (res, req, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statuscode = 500, message = "Something went wrong" } = err;
  res.status(statuscode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
