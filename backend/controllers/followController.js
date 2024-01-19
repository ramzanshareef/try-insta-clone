const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { User } = require("../models/UserModel");


const follow = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID);
            const userToFollow = await User.findById(req.params.userID);
            if (!userToFollow || user === userToFollow) {
                return res
                    .status(404)
                    .json({
                        message: "User Not Found"
                    })
            }
            if (user.following.includes(req.params.userID)) {
                return res
                    .status(400)
                    .json({
                        message: "Already Following"
                    })
            }
            user.following.push(req.params.userID);
            userToFollow.followers.push(req.session.userID);
            await user.save();
            await userToFollow.save();
            return res
                .status(200)
                .json({
                    message: "Followed Successfully"
                })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Follow"
            })
    }
}

const unfollow = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID);
            const userToUnfollow = await User.findById(req.params.userID);
            if (!userToUnfollow || user === userToUnfollow) {
                return res
                    .status(404)
                    .json({
                        message: "User Not Found"
                    })
            }
            if (!user.following.includes(req.params.userID)) {
                return res
                    .status(400)
                    .json({
                        message: "Not Following"
                    })
            }
            user.following.pull(req.params.userID);
            userToUnfollow.followers.pull(req.session.userID);
            await user.save();
            await userToUnfollow.save();
            return res
                .status(200)
                .json({
                    message: "Unfollowed Successfully"
                })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Unfollow"
            })
    }
}

// const suggestedFollowing = async (req, res) => {
//     try {
//         isAuthenticated(req, res, async () => {
//             const curUser = await User.findById(req.params.userID);
//             const curUserFollowing = curUser.following;
//             const curUserFollowers = curUser.followers;
//             if (curUserFollowing.length === 0 && curUserFollowers.length === 0) {
//                 return res
//                     .status(200)
//                     .json({
//                         message: "No Suggestions"
//                     })
//             }
//             let suggestedUsers = [];
//             curUserFollowing.forEach(async (following) => {
//                 const user = await User.findById(following);
//                 const userFollowing = user.following;
//                 userFollowing.forEach((userFollowing) => {
//                     if (userFollowing !== req.session.userID && !curUserFollowing.includes(userFollowing) && !curUserFollowers.includes(userFollowing)) {
//                         suggestedUsers.push(userFollowing);
//                     }
//                 })
//             });
//             return res
//                 .status(200)
//                 .json({
//                     suggestedFollowing: []
//                 })
//         });
//     }
//     catch (err) {
//         return res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "Suggested Followers"
//             })
//     }
// }

module.exports = {
    follow,
    unfollow,
    // suggestedFollowing
};