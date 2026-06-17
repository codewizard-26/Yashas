const express = require("express");

const NotificationController = require("../controllers/notification.controller");

const privateRouter = express.Router();

privateRouter.get("/", NotificationController.getNotifications);
privateRouter.get("/unread-count",NotificationController.getUnreadCount);
privateRouter.put("/:notificationId/read",NotificationController.markAsRead);
privateRouter.put("/read-all",NotificationController.markAllAsRead);
privateRouter.delete("/:notificationId",NotificationController.deleteNotification);

module.exports = {
    private: privateRouter,
};