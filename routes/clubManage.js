const express = require("express");
const router = express.Router();
const ClubManageController = require("../controllers/ClubManageController");

router.get("/create-club", (req, res, next) => {
  res.render("create-club");
});
router.post("/create-club", ClubManageController.create);

router.get("/view-club/:id", ClubManageController.display);

router.get("/join-club", (req, res, next) => {
  res.render("join-club");
});
router.post("/join-club", ClubManageController.join);

module.exports = router;
