const express = require("express");
const ProfileController = require("../controllers/profile.controller");

const router = express.Router();

router.get("/me", ProfileController.getMyProfile);
router.put("/update", ProfileController.updateMyProfile);

module.exports = router;