const express = require("express");

const {authMiddleware} = require("./middlewares/auth.middleware");

// Route modules
const authRoutes = require("./routes/auth.route");

// Public Router
const publicRouter = express.Router();

// Private Router
const privateRouter = express.Router();

// Every route mounted here automatically runs authMiddleware
privateRouter.use(authMiddleware);

// Public Routes
publicRouter.use("/auth", authRoutes.public);

//Private Routes
privateRouter.use("/auth", authRoutes.private);

module.exports = {
    publicRouter,
    privateRouter,
};