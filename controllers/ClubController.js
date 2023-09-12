const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Club = require("../models/club");
const User = require("../models/user");
const Post = require("../models/message");

exports.createPost = [
  body("title", "Title must be specified")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 60 })
    .withMessage("Title must not exceed 60 chars")
    .escape(),
  body("message", "Message must be specified")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 500 })
    .withMessage("Message must not exceed 500 chars")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("create-post", {
        title: req.body.title,
        message: req.body.message,
        errors: errors.array(),
      });
      return;
    }

    try {
      const post = new Post({
        title: req.body.title,
        message: req.body.message,
        creator: req.user.id,
      });
      const result = await post.save();
      await Club.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { messages: message._id } }
      ).exec();
      res.render("view-post", {
        title: result.title,
        message: result.message,
      });
    } catch (err) {
      return next(err);
    }
  }),
];

exports.viewPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.render("view-post", {
      title: post.title,
      message: post.message,
    });
  } catch (err) {
    console.log("req.params.id: " + req.params.id);
    return next(err);
  }
});

// RCp6-m3Ut-XsSc
