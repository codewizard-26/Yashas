const { Token } = require("../utils/generateToken");
const token = new Token();
const authMiddleware = async ( req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        
        const accessToken = authHeader.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Access token missing",
            });
        }
        
        const decoded = token.verifyAccessToken(accessToken)
        // console.log(decoded)
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = {authMiddleware};