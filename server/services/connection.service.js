const { db } = require("../config/db");
const { connections } = require("../drizzle/schema/connections.schema");
const { users } = require("../drizzle/schema/user.scehma");
const { eq, and, or } = require("drizzle-orm");

class ConnectionService {

    static async sendRequest(req) {
        const senderId = req.user.id;
        const receiverId = req.params.userId;

        if (senderId === receiverId) {
            throw new Error("Cannot send request to yourself");
        }

        const receiver = await db.query.users.findFirst({
            where: eq(users.id, receiverId),
        });

        if (!receiver) {
            throw new Error("User not found");
        }

        const existing = await db.query.connections.findFirst({
            where: or(
                and(
                    eq(connections.senderId, senderId),
                    eq(connections.recieverId, receiverId)
                ),
                and(
                    eq(connections.senderId, receiverId),
                    eq(connections.recieverId, senderId)
                )
            ),
        });

        if (existing) {
            throw new Error("Connection already exists");
        }

        const [connection] = await db
            .insert(connections)
            .values({
                senderId,
                recieverId: receiverId,
                connectionStatusId: "6798c346-6001-40b2-813f-91ab7ba1e6c5",
            })
            .returning();

        return {
            success: true,
            message: "Connection request sent",
            data: connection,
        };
    }

    static async acceptRequest(req) {
        const userId = req.user.id;
        const { connectionId } = req.params;
        // const { connectionStatusId } = req.body;

        const connection = await db.query.connections.findFirst({
            where: eq(connections.id, connectionId),
        });

        if (!connection) {
            throw new Error("Connection request not found");
        }

        if (connection.recieverId !== userId) {
            throw new Error("Unauthorized");
        }

        if (
            connection.connectionStatusId !==
            "6798c346-6001-40b2-813f-91ab7ba1e6c5"
        ) {
            return {
                success: false,
                status: 400,
                message: "Connection request is not pending",
            };
        }

        const [updated] = await db
            .update(connections)
            .set({
                connectionStatusId: "8d8e101b-85c5-417e-925b-9006137520dc",
            })
            .where(eq(connections.id, connectionId))
            .returning();

        return {
            success: true,
            message: "Connection accepted",
            data: updated,
        };
    }

    static async rejectRequest(req) {
        const userId = req.user.id;
        const { connectionId } = req.params;
        // const { connectionStatusId } = req.body;

        const connection = await db.query.connections.findFirst({
            where: eq(connections.id, connectionId),
        });

        if (!connection) {
            throw new Error("Connection request not found");
        }

        if (connection.recieverId !== userId) {
            throw new Error("Unauthorized");
        }

        if (
            connection.connectionStatusId !==
            "6798c346-6001-40b2-813f-91ab7ba1e6c5"
        ) {
            return {
                success: false,
                status: 400,
                message: "Connection request is not pending",
            };
        }

        const [updated] = await db
            .update(connections)
            .set({
                connectionStatusId: "ad9e2e77-e01d-4e8a-9792-b28a216ef508",
            })
            .where(eq(connections.id, connectionId))
            .returning();

        return {
            success: true,
            message: "Connection rejected",
            data: updated,
        };
    }

    static async cancelRequest(req) {
        const userId = req.user.id;
        const { connectionId } = req.params;

        const connection = await db.query.connections.findFirst({
            where: eq(connections.id, connectionId),
        });

        if (!connection) {
            throw new Error("Connection request not found");
        }

        if (connection.senderId !== userId) {
            throw new Error("Unauthorized");
        }

        await db
            .delete(connections)
            .where(eq(connections.id, connectionId));

        return {
            success: true,
            message: "Connection request cancelled",
        };
    }

    static async removeConnection(req) {
        const userId = req.user.id;
        const { connectionId } = req.params;

        const connection = await db.query.connections.findFirst({
            where: eq(connections.id, connectionId),
        });

        if (!connection) {
            throw new Error("Connection not found");
        }

        if (
            connection.senderId !== userId &&
            connection.recieverId !== userId
        ) {
            throw new Error("Unauthorized");
        }

        await db
            .delete(connections)
            .where(eq(connections.id, connectionId));

        return {
            success: true,
            message: "Connection removed",
        };
    }

    static async getReceivedRequests(req) {
        const userId = req.user.id;

        const requests = await db.query.connections.findMany({
            where: and(
                eq(connections.recieverId, userId),
                eq(
                    connections.connectionStatusId,
                    "6798c346-6001-40b2-813f-91ab7ba1e6c5"
                )
            ),
        });

        return {
            success: true,
            status: 200,
            data: requests,
        };
    }

    static async getSentRequests(req) {
        const userId = req.user.id;

        const requests = await db.query.connections.findMany({
            where: and(
                eq(connections.senderId, userId),
                eq(
                    connections.connectionStatusId,
                    "6798c346-6001-40b2-813f-91ab7ba1e6c5"
                )
            ),
        });

        return {
            success: true,
            status: 200,
            data: requests,
        };
    }

    static async getMyConnections(req) {
        const userId = req.user.id;

        const connectionsList = await db.query.connections.findMany({
            where: and(
                or(
                    eq(connections.senderId, userId),
                    eq(connections.recieverId, userId)
                ),
                eq(
                    connections.connectionStatusId,
                    "8d8e101b-85c5-417e-925b-9006137520dc"
                )
            ),
        });

        return {
            success: true,
            status: 200,
            data: connectionsList,
        };
    }
}

module.exports = ConnectionService;