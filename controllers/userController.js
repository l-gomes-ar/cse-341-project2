const User = require("../models/User");

const userController = {};

userController.findOrCreate = async (query) => {
    try {
        const user = await User.findOneAndUpdate(query, {}, { new: true, upsert: true });
        return user;
    } catch (err) {
        console.error("Could not find or create user:", err);
        return null;
    }
}

module.exports = userController;