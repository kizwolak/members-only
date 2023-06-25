const express = require("express");
const router = express.Router();
const Club = require("../models/club");
const AuthenticationController = require("../controllers/AuthenticationController");
const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up");
});
router.post("/sign-up", AuthenticationController.signup);

router.get("/log-in", (req, res, next) => {
  res.render("log-in");
});
router.post("/log-in", AuthenticationController.login);

router.get(
  "/homepage",
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const clubs = [];
    for (const club of user.club) {
      const foundClub = await Club.findById(club._id).exec();
      clubs.push(foundClub);
    }
    console.log("clubs: " + clubs);
    res.render("homepage", { user: user, clubs: clubs });
  })
);

module.exports = router;
