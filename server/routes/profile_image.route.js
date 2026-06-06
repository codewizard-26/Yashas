const express = require("express");
const profileController = require("../controllers/profile.controller.js");

const router = express.Router();

router.get("/me", profileController.getMyProfile);
router.put("/update", profileController.updateMyProfile);

router.put("/profile-image", upload.single("profileImage"), profileController.uploadProfileImage);

module.exports = router;