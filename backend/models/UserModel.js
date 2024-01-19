const mongoose = require("mongoose");
const myDateTime = require("../utils/myDateTime");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: []
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: []
    },
    likedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "post",
        default: []
    },
    savedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "post",
        default: []
    },
    // profilePic: {
    //     type: Buffer,
    //     default: null
    // },

});

const User = mongoose.model("user", UserSchema);

module.exports = {
    User
};