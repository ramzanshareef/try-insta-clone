const { User } = require("../models/UserModel");
const { Post } = require("../models/PostModel");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { logoutUser } = require("../utils/authentication");

const getUser = (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID).select("-password -__v -_id -email");
            const userPosts = await Post.find({ postedBy: req.session.userID }).select("-__v -postedBy -_id").sort("-createdAt");
            return res
                .status(200)
                .json({
                    user: user,
                    posts: userPosts
                })
        });
    }
    catch (err) {
        logoutUser(req)
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Get User"
            })
    }

}

// const updateUser = (req, res) => {
//     try {
//         isAuthenticated(req, res, async () => {
//             const user = await User.findByIdAndUpdate(req.session.userID, req.body, { new: true }).select("-password -__v -_id");
//             res
//                 .status(200)
//                 .json({
//                     user: user
//                 })
//         });
//     }
//     catch (err) {
//         res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "Update User"
//             })
//     }
// }

const getOtherUsers = (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const users = await User.findById(req.params.userID).select("-password -__v -_id");
            const userPosts = await Post.find({ postedBy: req.params.userID }).select("-__v -postedBy -_id").sort("-createdAt");
            return res
                .status(200)
                .json({
                    users: users,
                    posts: userPosts
                })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Get Other Users"
            })
    }
}

module.exports = {
    getUser,
    // updateUser,
    getOtherUsers
}