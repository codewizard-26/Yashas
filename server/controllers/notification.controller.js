const NotificationService = require("../services/notification.service");

class NotificationController {

    static async getNotifications(req, res, next) {
        try {
            const data = await NotificationService.getNotifications(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getUnreadCount(req, res, next) {
        try {
            const data = await NotificationService.getUnreadCount(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async markAsRead(req, res, next) {
        try {
            const data = await NotificationService.markAsRead(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async markAllAsRead(req, res, next) {
        try {
            const data = await NotificationService.markAllAsRead(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async deleteNotification(req, res, next) {
        try {
            const data = await NotificationService.deleteNotification(req);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = NotificationController;