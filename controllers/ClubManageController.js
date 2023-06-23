const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Club = require("../models/club");

exports.create = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("create-club", {
        name: req.body.name,
        errors: errors.array(),
      });
      return;
    }

    try {
      const club = new Club({
        name: req.body.name,
        owner: req.user._id,
      });
      const result = await club.save();
      console.log(club);
      res.render("view-club", {
        title: club.name,
        code: club.join_code,
      });
    } catch (err) {
      return next(err);
    }
  }),
];

exports.display = asyncHandler(async (req, res, next) => {
  const club = Club.findById(req.params.id).exec();
  res.render("view-club", {
    title: club.name,
    code: club.join_code,
  });
});
