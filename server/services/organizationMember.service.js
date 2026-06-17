const { db } = require("../config/db");
const { organizationMembers } = require("../drizzle/schema/organizationMembers.schema");
const { users } = require("../drizzle/schema/user.schema");
const { organizations } = require("../drizzle/schema/organization.schema");
const { organizationRole } = require("../drizzle/schema/organizationRoles.schema");
const { controlLevel } = require("../drizzle/schema/controlLevel.schema");
const { generateNotification } = require("../utils/generateNotification");
const { eq, and } = require("drizzle-orm");

class OrganizationMembersService {

    static async addMember(req) {

        const { email, roleName, levelName } = req.body;
        const organizationId = req.user.id;

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            };
        }

        const role = await db.query.organizationRole.findFirst({
            where: eq(organizationRole.roleName, roleName),
        });

        if (!role) {
            return {
                success: false,
                status: 404,
                message: "Role not found",
            };
        }

        const level = await db.query.controlLevel.findFirst({
            where: eq(controlLevel.levelName, levelName),
        });

        if (!level) {
            return {
                success: false,
                status: 404,
                message: "Control level not found",
            };
        }

        const existing = await db.query.organizationMembers.findFirst({
            where: and(
                eq(organizationMembers.userId, user.id),
                eq(organizationMembers.organizationId, organizationId)
            ),
        });

        if (existing) {
            return {
                success: false,
                status: 400,
                message: "User is already a member",
            };
        }

        const member = await db
            .insert(organizationMembers)
            .values({
                userId: user.id,
                organizationId,
                organizationRoleId: role.id,
                controllevelId: level.id,
                startDate: new Date(),
                isActive: true,
            })
            .returning();

        await generateNotification({
            userId: user.id,
            actorId: organizationId,
            notificationType: "ORGANIZATION",
            title: "Added to Organization",
            message: "You have been added to an organization.",
            metadata: {
                organizationId,
                memberId: member[0].id,
            },
        });

        return {
            success: true,
            status: 201,
            data: member[0],
        };
    }

    static async getOrganizationMembers(organizationId) {

        const members = await db
            .select()
            .from(organizationMembers)
            .where(eq(organizationMembers.organizationId, organizationId));

        return {
            success: true,
            status: 200,
            data: members,
        };
    }

    static async getMyOrganizations(userId) {
        const myOrganizations = await db
            .select({
                organizationId: organizationMembers.organizationId,
                organizationName: organizations.name,
            })
            .from(organizationMembers)
            .innerJoin(
                organizations,
                eq(organizationMembers.organizationId, organizations.id)
            )
            .where(eq(organizationMembers.userId, userId));

        return {
            success: true,
            status: 200,
            data: myOrganizations,
        };
    }

    static async updateMember(req) {

        const { email, roleName, levelName } = req.body;
        const organizationId = req.user.id;

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            };
        }

        const updateData = {};

        if (roleName) {
            const role = await db.query.organizationRole.findFirst({
                where: eq(organizationRole.roleName, roleName),
            });

            if (!role) {
                return {
                    success: false,
                    status: 404,
                    message: "Role not found",
                };
            }

            updateData.organizationRoleId = role.id;
        }

        if (levelName) {
            const level = await db.query.controlLevel.findFirst({
                where: eq(controlLevel.levelName, levelName),
            });

            if (!level) {
                return {
                    success: false,
                    status: 404,
                    message: "Control level not found",
                };
            }

            updateData.controllevelId = level.id;
        }

        await db
            .update(organizationMembers)
            .set(updateData)
            .where(
                and(
                    eq(organizationMembers.userId, user.id),
                    eq(organizationMembers.organizationId, organizationId)
                )
            );

        await generateNotification({
            userId: user.id,
            actorId: organizationId,
            notificationType: "ORGANIZATION",
            title: "Organization Role Updated",
            message: "Your organization role or permissions have been updated.",
            metadata: {
                organizationId,
            },
        });

        return {
            success: true,
            status: 200,
            data: updateData,
        };
    }

    static async removeMember(req) {

        const { email } = req.body;
        const organizationId = req.user.id;

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            };
        }

        await db
            .delete(organizationMembers)
            .where(
                and(
                    eq(organizationMembers.userId, user.id),
                    eq(organizationMembers.organizationId, organizationId)
                )
            );

        await generateNotification({
            userId: user.id,
            actorId: organizationId,
            notificationType: "ORGANIZATION",
            title: "Removed from Organization",
            message: "You have been removed from an organization.",
            metadata: {
                organizationId,
            },
        });

        return {
            success: true,
            status: 200,
            message: "Member removed successfully",
        };
    }

}

module.exports = OrganizationMembersService;