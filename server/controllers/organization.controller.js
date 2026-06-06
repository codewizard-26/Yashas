const OrganizationService = require("../services/organization.service");

class OrganizationController {
    static async register(req, res, next) {
        try {
            const result = await OrganizationService.register(req.body);

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const result = await OrganizationService.login(
                email,
                password
            );

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async refresh(req, res, next) {
        try {
            const refreshToken = req.headers.authorization.split(" ")[1];

            const result = await OrganizationService.refresh( refreshToken );

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            const refreshToken = req.headers.authorization.split(" ")[1];
            console.log(refreshToken)
            const result = await OrganizationService.logout(
                refreshToken
            );

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getMe(req, res, next) {
        try {
            const organization = await OrganizationService.getMe(
                req.user.id
            );

            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }

    static async updateMe(req, res, next) {
        try {
            const organization = await OrganizationService.updateMe(
                req.user.id,
                req.body
            );

            return res.status(200).json(organization);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrganizationController;