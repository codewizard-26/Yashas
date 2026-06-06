const express = require("express");

const OrganizationMembersController = require("../controllers/organizationMember.controller");

const publicRouter = express.Router();
const privateRouter = express.Router();

// Public Routes
// (Add any public routes here if needed)

// Private Routes
privateRouter.post("/add", OrganizationMembersController.addMember);
privateRouter.get("/members",OrganizationMembersController.getOrganizationMembers);
privateRouter.get("/my-organizations",OrganizationMembersController.getMyOrganizations);
privateRouter.put("/update",OrganizationMembersController.updateMember);
privateRouter.delete("/:id",OrganizationMembersController.removeMember);

module.exports = {
    public: publicRouter,
    private: privateRouter,
};