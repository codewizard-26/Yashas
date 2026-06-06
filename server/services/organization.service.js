const bcrypt = require("bcrypt");
const { eq } = require("drizzle-orm");

const { db } = require("../config/db");
const { Token } = require("../utils/generateToken");

const {organizations} = require("../drizzle/schema/organization.schema");
const {organizationRefreshTokens} = require("../drizzle/schema/organizationRefreshToken.schema");
const {organizationTypes} = require("../drizzle/schema/organizationTypes.schema");

const token = new Token();

class OrganizationService {

    static async register(data) {
        const existingOrganization =
            await db.query.organizations.findFirst({
                where: eq(
                    organizations.email,
                    data.email
                ),
            });

        if (existingOrganization) {
            throw new Error("Organization already exists");
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            10
        );
        
        const organizationType = await db.query.organizationTypes.findFirst({
            where: eq(
                organizationTypes.typeName,
                data.organizationType
            ),
        });
        
        if (!organizationType) {
            throw new Error("Invalid organization type");
        }

        const [organization] = await db
            .insert(organizations)
            .values({
                ...data,
                organizationTypeId: organizationType.id,
                organizationVerificationStatusId: "54125e38-ba83-44cf-b836-a305dba53727",
                passwordHash: hashedPassword,
            })
            .returning();

        const payload = {
            id: organization.id,
            email: organization.email,
        };

        const {
            accessToken,
            refreshToken,
        } = token.generateTokenPair(payload);

        await db
            .insert(organizationRefreshTokens)
            .values({
                organizationId: organization.id,
                token: refreshToken,
                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                ),
            });

        return {
            organization,
            accessToken,
            refreshToken,
        };
    }

    static async login(email, password) {

        const organization =
            await db.query.organizations.findFirst({
                where: eq(
                    organizations.email,
                    email
                ),
            });

        if (!organization) {
            throw new Error("Invalid credentials");
        }

        const validPassword =
            await bcrypt.compare(
                password,
                organization.passwordHash
            );

        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id: organization.id,
            email: organization.email,
        };

        const {
            accessToken,
            refreshToken,
        } = token.generateTokenPair(payload);

        await db
            .insert(organizationRefreshTokens)
            .values({
                organizationId: organization.id,
                token: refreshToken,
                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                ),
            });

        return {
            organization,
            accessToken,
            refreshToken,
        };
    }

    static async refresh(refreshToken) {

        const decoded = token.verifyRefreshToken( refreshToken );

        const tokenRecord =
            await db.query.organizationRefreshTokens.findFirst({
                where: eq(
                    organizationRefreshTokens.token,
                    refreshToken
                ),
            });

        if (!tokenRecord) {
            throw new Error(
                "Refresh token not found"
            );
        }

        const accessToken =
            token.generateAccessToken({
                id: decoded.id,
                email: decoded.email,
            });

        return {
            accessToken,
        };
    }

    static async logout(refreshToken) {

        await db
            .delete(
                organizationRefreshTokens
            )
            .where(
                eq(
                    organizationRefreshTokens.token,
                    refreshToken
                )
            );

        return {
            message:
                "Logged out successfully",
        };
    }

    static async getMe(organizationId) {

        const organization =
            await db.query.organizations.findFirst({
                where: eq(
                    organizations.id,
                    organizationId
                ),
            });

        if (!organization) {
            throw new Error(
                "Organization not found"
            );
        }

        return organization;
    }

    static async updateMe(
        organizationId,
        data
    ) {

        const [organization] =
            await db
                .update(organizations)
                .set(data)
                .where(
                    eq(
                        organizations.id,
                        organizationId
                    )
                )
                .returning();

        if (!organization) {
            throw new Error(
                "Organization not found"
            );
        }

        return organization;
    }
}

module.exports = OrganizationService;