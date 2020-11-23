const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("; ")[6].trim().split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5fba112bdd40bc144c6103b2").then((user) => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
    res.redirect("/");
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
