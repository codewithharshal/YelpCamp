const User = require("../models/user");

module.exports.registerpage = (req, res) => {
  res.render("users/register");
};

module.exports.createAccount = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeruser = await User.register(user, password);
    req.login(registeruser, (err) => {
      if (err) return next(err);
      req.flash("success", "Wellcome to Camps");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.loginpage = (req, res) => {
  res.render("users/login");
};

module.exports.loginAuth = (req, res) => {
  req.flash("success", "Welcome back");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut(function (err) {
    return next(err);
  });
  req.flash("success", "Comeback later");
  res.redirect("/campgrounds");
};
