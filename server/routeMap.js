const express = require("express");

const {authMiddleware} = require("./middlewares/auth.middleware");

// Route modules
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const organizationRoutes = require("./routes/organization.route");

// Public Router
const publicRouter = express.Router();

// Private Router
const privateRouter = express.Router();

// Every route mounted here automatically runs authMiddleware
privateRouter.use(authMiddleware);

// Public Routes
publicRouter.use("/auth", authRoutes.public);
publicRouter.use("/organization", organizationRoutes.public);

//Private Routes
privateRouter.use("/auth", authRoutes.private);
privateRouter.use("/profile", profileRoutes);
privateRouter.use("/organization", organizationRoutes.private);

module.exports = {
    publicRouter,
    privateRouter,
};