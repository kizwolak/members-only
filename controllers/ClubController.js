const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Club = require("../models/club");
const User = require("../models/user");

// exports.createPost = [
//   body("Title", "Title must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .isLength({ max: 60 })
//     .withMessage("Title must not exceed 60 chars")
//     .escape(),
//   body("message", "Message must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .isLength({ max: 500 })
//     .withMessage("Message must not exceed 500 chars")
//     .escpae(),
// ];
