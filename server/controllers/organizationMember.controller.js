const OrganizationMembersService = require("../services/organizationMember.service");

class OrganizationMembersController {

    static async addMember(req, res) {
        const result = await OrganizationMembersService.addMember(req);
        return res.status(result.status).json(result);
    }

    static async getOrganizationMembers(req, res) {
        const result = await OrganizationMembersService.getOrganizationMembers(req.user.id);
        return res.status(result.status).json(result);
    }

    static async getMyOrganizations(req, res) {
        const result = await OrganizationMembersService.getMyOrganizations(req.user.id);
        return res.status(result.status).json(result);
    }

    static async updateMember(req, res) {
        const result = await OrganizationMembersService.updateMember(req);
        return res.status(result.status).json(result);
    }

    static async removeMember(req, res) {
        const result = await OrganizationMembersService.removeMember(req);

        return res.status(result.status).json(result);
    }
}

module.exports = OrganizationMembersController;