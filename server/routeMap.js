const express = require("express");

const {authMiddleware} = require("./middlewares/auth.middleware");

// Route modules
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const connectionRoutes = require("./routes/connection.route");
const organizationRoutes = require("./routes/organization.route");
const jobRoutes = require("./routes/jobs.route");
const organizationMemberRoutes = require("./routes/organizationMember.route");
const connectionRoute = require("./routes/connection.route");

// Public Router
const publicRouter = express.Router();

// Private Router
const privateRouter = express.Router();

// Every route mounted here automatically runs authMiddleware
privateRouter.use(authMiddleware);

// Public Routes
publicRouter.use("/auth", authRoutes.public);
publicRouter.use("/organization", organizationRoutes.public);
publicRouter.use("/jobs", jobRoutes.public);

//Private Routes
privateRouter.use("/auth", authRoutes.private);
privateRouter.use("/profile", profileRoutes);
privateRouter.use("/connection", connectionRoutes.private);
privateRouter.use("/organization", organizationRoutes.private);
privateRouter.use("/organizationMember", organizationMemberRoutes.private);
privateRouter.use("/job", jobRoutes.private);

module.exports = {
    publicRouter,
    privateRouter,
};