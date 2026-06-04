const express = require("express");

const OrganizationController = require("../controllers/organization.controller");

const publicRouter = express.Router();
const privateRouter = express.Router();

publicRouter.post("/register", OrganizationController.register);
publicRouter.post("/login", OrganizationController.login);
publicRouter.post("/refresh", OrganizationController.refresh);

privateRouter.post("/logout", OrganizationController.logout);

privateRouter.get("/me", OrganizationController.getMe);
privateRouter.patch("/me", OrganizationController.updateMe);

module.exports = {
    public: publicRouter,
    private: privateRouter,
};