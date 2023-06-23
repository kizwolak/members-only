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

router.get("/log-in", (req, res, next) => {
  res.render("log-in");
});
router.post("/log-in", AuthenticationController.login);

router.get("/success", (req, res, next) => {
  const user = req.user;
  res.render("success", { user: user });
});

module.exports = router;
