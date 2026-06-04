const ProfileService = require("../services/profile.service")

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("controller")
        const profile = await ProfileService.getMyProfile(userId);
        console.log(profile)
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await ProfileService.updateMyProfile(
            userId,
            req.body
        );

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
};