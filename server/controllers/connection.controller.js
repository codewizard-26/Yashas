const ConnectionService = require("../services/connection.service");

class ConnectionController {

    static async sendRequest(req, res, next) {
        try {
            const data = await ConnectionService.sendRequest(req);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async acceptRequest(req, res, next) {
        try {
            const data = await ConnectionService.acceptRequest(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async rejectRequest(req, res, next) {
        try {
            const data = await ConnectionService.rejectRequest(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async cancelRequest(req, res, next) {
        try {
            const data = await ConnectionService.cancelRequest(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async removeConnection(req, res, next) {
        try {
            const data = await ConnectionService.removeConnection(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getReceivedRequests(req, res, next) {
        try {
            const data = await ConnectionService.getReceivedRequests(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getSentRequests(req, res, next) {
        try {
            const data = await ConnectionService.getSentRequests(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getMyConnections(req, res, next) {
        try {
            const data = await ConnectionService.getMyConnections(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = ConnectionController;