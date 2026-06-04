const OrganizationService = require("../services/organization.service");

class OrganizationController {
    static async create(req, res, next) {
        try {
            const organization = await OrganizationService.create(req.body);

            return res.status(201).json(organization);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const organizations = await OrganizationService.getAll();

            return res.status(200).json(organizations);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const organization = await OrganizationService.getById(
                req.params.id
            );

            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const organization = await OrganizationService.update(
                req.params.id,
                req.body
            );

            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }

    static async remove(req, res, next) {
        try {
            await OrganizationService.remove(req.params.id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrganizationController;