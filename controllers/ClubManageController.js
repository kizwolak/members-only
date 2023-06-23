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
      if (err) {
        return next(err);
      } else {
        const club = new Club({
          name: req.body.name,
        });
      }
    } catch (err) {
      return next(err);
    }
  }),
];
