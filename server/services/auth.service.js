const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { eq } = require("drizzle-orm");

const {db} = require("../config/db");
const { Token } = require("../utils/generateToken");

const { users } = require("../drizzle/schema/user.scehma");
const { refreshTokens } = require("../drizzle/schema/refreshToken.schema");
const token = new Token();

class AuthService {

    async register(data) {
        const {
            name,
            email,
            password,
            phone
        } = data;
        
        const existingUser = await db.query.users.findFirst({
                where: eq(users.email, email),
            });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await db.insert(users).values({
                fullName: name,
                email,
                passwordHash: hashedPassword,
                phone,
            }).returning();

        const payload = {
            id: user.id,
            email: user.email,
        };

        const {
            accessToken,
            refreshToken,
        } = token.generateTokenPair(payload);

        await db.insert(refreshTokens).values({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ),
        });

        delete user.password;

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async login(email, password) {

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }
        console.log("password:", password);
        console.log("user:", user);
        const validPassword = await bcrypt.compare(password, user.passwordHash);

        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const {
            accessToken,
            refreshToken,
        } = token.generateTokenPair(payload);

        await db.insert(refreshTokens).values({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        delete user.password;

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async refresh(refreshToken) {

        const decoded = token.verifyRefreshToken( refreshToken );

        const tokenRecord = await db.query.refreshTokens.findFirst({
            where: eq(
                refreshTokens.token,
                refreshToken
            ),
        });

        if (!tokenRecord) {
            throw new Error("Refresh token not found");
        }

        const accessToken = token.generateAccessToken({
            id: decoded.id,
            email: decoded.email,
        });

        return {
            accessToken,
        };
    }

    async logout(refreshToken) {
        console.log(refreshToken)
        await db.delete(refreshTokens).where(
            eq(
                refreshTokens.token,
                refreshToken
            )
        );

        return {
            message:"Logged out successfully",
        };
    }

    async logoutAll(userId) {

        await db.delete(refreshTokens).where(
            eq(
                refreshTokens.userId,
                userId
            )
        );

        return {
            message:"Logged out from all devices",
        };
    }
}

module.exports = new AuthService();