const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({ 
    githubId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: true
    }
});

const User = model("User", userSchema);

module.exports = User;