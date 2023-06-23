const express = require("express");
const router = express.Router();
const ClubManageController = require("../controllers/ClubManageController");

router.get("/create-club", (req, res, next) => {
  res.render("create-club");
});

module.exports = router;
