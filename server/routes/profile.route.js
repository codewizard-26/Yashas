const express = require("express");
const ProfileController = require("../controllers/profile.controller");
const upload = require("../middlewares/upload.middleware.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/me", ProfileController.getMyProfile);
router.put("/update", ProfileController.updateMyProfile);

router.put("/profile-image",authMiddleware, upload.single("profileImage"), ProfileController.uploadProfileImage);

module.exports = router;