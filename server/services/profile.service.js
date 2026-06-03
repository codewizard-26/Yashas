const {db} = require("../config/db");
const { users } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

class ProfileService {
    static async getMyProfile(userId) {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));

        return user;
    }

    static async updateMyProfile(userId, data) {
        const [updatedUser] = await db
            .update(users)
            .set(data)
            .where(eq(users.id, userId))
            .returning();

        return updatedUser;
    }
}

module.exports = ProfileService;