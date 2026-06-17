const { eq } = require("drizzle-orm");

const { db } = require("../config/db");
const { notifications } = require("../drizzle/schema/notification.schema");
const { notificationTypes } = require("../drizzle/schema/notificationType.schema");

async function generateNotification({
    userId,
    actorId,
    notificationType,
    title,
    message,
    metadata = null,
}) {

    const type = await db.query.notificationTypes.findFirst({
        where: eq(notificationTypes.name, notificationType),
    });

    if (!type) {
        throw new Error("Invalid notification type");
    }

    const [notification] = await db
        .insert(notifications)
        .values({
            userId,
            actorId,
            notificationTypeId: type.id,
            title,
            message,
            metadata,
        })
        .returning();

    return notification;
}

module.exports = {
    generateNotification,
};