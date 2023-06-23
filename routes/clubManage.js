const express = require("express");
const router = express.Router();
const ClubManageController = require("../controllers/ClubManageController");

router.get("/create-club", (req, res, next) => {
  res.render("create-club");
});
router.post("/create-club", ClubManageController.create);

router.get("/clubs/view-club/:id", ClubManageController.display);

module.exports = router;
