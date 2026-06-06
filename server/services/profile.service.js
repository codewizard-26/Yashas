const {db} = require("../config/db");
const { users } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");
const cloudinary = require("../utils/cloudinary")

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


    static async uploadProfileImage(userId, file) {
        const result = await cloudinary.uploader.upload(
            file.path,
            {
               folder:"profile-images",
            }
        );

        await db
            .update(users)
            .set({
                profileImage: result.secure_url,
            })
            .where(eq(users.id,userId));
            
        return{
            imageUrl: result.secure_url,
        }    

    };

}

module.exports = ProfileService;