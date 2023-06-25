const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Club = require("../models/club");
const User = require("../models/user");

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
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { club: result._id } }
      );
      res.redirect("/clubs/view-club/" + club._id, {
        title: club.name,
        code: club.join_code,
      });
    } catch (err) {
      return next(err);
    }
  }),
];

exports.display = asyncHandler(async (req, res, next) => {
  const club = await Club.findById(req.params.id).exec();
  const members = await User.find({ club: club._id }).exec();
  res.render("view-club", {
    title: club.name,
    code: club.join_code,
    members: members,
    id: req.params.id,
  });
});

exports.join = asyncHandler(async (req, res, next) => {
  const club = await Club.findOne({ join_code: req.body.code }).exec();
  console.log("joined club: " + club);
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { club: club._id } }
  );
  res.redirect("../homepage");
});

// ErYM-9KM0-srLb
// In40-3DpV-ucB4
