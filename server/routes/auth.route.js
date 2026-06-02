const express = require("express");

const AuthController = require("../controllers/auth.controller");

const publicRouter = express.Router();
const privateRouter = express.Router();

publicRouter.post("/register", AuthController.register);
publicRouter.post("/login", AuthController.login);
publicRouter.post("/refresh", AuthController.refresh);

privateRouter.post("/logout", AuthController.logout);
privateRouter.post("/logout-all", AuthController.logoutAll);

module.exports = {
    public: publicRouter,
    private: privateRouter,
};