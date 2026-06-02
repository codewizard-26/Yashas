const AuthService = require("../services/auth.service");

class AuthController {

    async register(req, res, next) {
        try {
            const result = await AuthService.register(req.body);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email,password);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result =  AuthService.refresh(refreshToken);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.logout(refreshToken);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async logoutAll(req, res, next) {
        try {
            const result = await AuthService.logoutAll( req.user.id );
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();