const { eq, and, count } = require("drizzle-orm");

const { db } = require("../config/db");
const {
    notifications,
} = require("../drizzle/schema/notification.schema");

class NotificationService {

    static async getNotifications(req) {

        const userId = req.user.id;

        const data = await db.query.notifications.findMany({
            where: eq(notifications.userId, userId),
            orderBy: (notifications, { desc }) => [
                desc(notifications.createdAt),
            ],
        });

        return {
            success: true,
            status: 200,
            data,
        };
    }

    static async getUnreadCount(req) {

        const userId = req.user.id;

        const unread = await db.query.notifications.findMany({
            where: and(
                eq(notifications.userId, userId),
                eq(notifications.isRead, false)
            ),
        });

        return {
            success: true,
            status: 200,
            count: unread.length,
        };
    }

    static async markAsRead(req) {

        const userId = req.user.id;
        const { notificationId } = req.params;

        const notification = await db.query.notifications.findFirst({
            where: and(
                eq(notifications.id, notificationId),
                eq(notifications.userId, userId)
            ),
        });

        if (!notification) {
            throw new Error("Notification not found");
        }

        await db
            .update(notifications)
            .set({
                isRead: true,
            })
            .where(eq(notifications.id, notificationId));

        return {
            success: true,
            status: 200,
            message: "Notification marked as read",
        };
    }

    static async markAllAsRead(req) {

        const userId = req.user.id;

        await db
            .update(notifications)
            .set({
                isRead: true,
            })
            .where(eq(notifications.userId, userId));

        return {
            success: true,
            status: 200,
            message: "All notifications marked as read",
        };
    }

    static async deleteNotification(req) {

        const userId = req.user.id;
        const { notificationId } = req.params;

        const notification = await db.query.notifications.findFirst({
            where: and(
                eq(notifications.id, notificationId),
                eq(notifications.userId, userId)
            ),
        });

        if (!notification) {
            throw new Error("Notification not found");
        }

        await db
            .delete(notifications)
            .where(eq(notifications.id, notificationId));

        return {
            success: true,
            status: 200,
            message: "Notification deleted successfully",
        };
    }

    // Helper method (call from other services)
    static async createNotification({
        userId,
        actorId,
        type,
        title,
        message,
        metadata = null,
    }) {

        const [notification] = await db
            .insert(notifications)
            .values({
                userId,
                actorId,
                type,
                title,
                message,
                metadata,
            })
            .returning();

        return notification;
    }

}

module.exports = NotificationService;