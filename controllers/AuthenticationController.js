const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

exports.signup = [
  body("first_name", "First name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password_confirm) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("first name: " + req.body.first_name);

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    }

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
          });
          const result = await user.save();
          res.redirect("/");
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];

exports.login = [
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  }),
];
