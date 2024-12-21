const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAysnc = require("../utils/wrapAysnc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/user.js");

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/singup.ejs");
  })
  .post(wrapAysnc(userControllers.signupuser));

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.loginuser
  );

router.get("/logout", userControllers.logoutuser);
module.exports = router;
