// services/auth.service.js

const jwt = require("jsonwebtoken");

class token {

    generateAccessToken(payload) {
        return jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "15m",
            }
        );
    }

    generateRefreshToken(payload) {
        return jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "30d",
            }
        );
    }

    generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    verifyAccessToken(token) {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
    }

    verifyRefreshToken(token) {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );
    }
}

module.exports = { token }