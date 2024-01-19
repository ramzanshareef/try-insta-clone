const mongoose = require("mongoose");
const myDateTime = require("../utils/myDateTime");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    dateCommented: {
        type: String,
        default: myDateTime(new Date())
    },
    likes: {
        type: Number,
        default: 0
    },
    // likedBy: {
    //     type: Array,
    //     default: []
    // },
});

const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    caption: {
        type: String
    },
    datePosted: {
        type: String,
        default: myDateTime(new Date())
    },
    updatedAt:{
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: []
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
});

const Post = mongoose.model("post", PostSchema);

module.exports = {
    Post
}