const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/AuthenticationController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up");
});

router.post("/sign-up", AuthenticationController.signup);

module.exports = router;
