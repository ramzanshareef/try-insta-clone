const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Post } = require("../models/PostModel");
const { User } = require("../models/UserModel");
const fs = require("fs");
const { uploadImage, createStorage } = require("../utils/mediaHandler");


const addPost = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID).select("-password");
            const postsDir =  "users/" + user.name + "/posts";
            const storage = createStorage(postsDir);
            uploadImage(storage)(req, res, async (err) => {
                if (err) {
                    console.log("Error = " + err.message);
                }
                else{
                    const imageDataBuffer = fs.readFileSync(req.file.path);
                    const imageData = Buffer.from(imageDataBuffer, "base64");
                    const post = new Post({
                        caption: req.body.caption,
                        photo: {
                            data: imageData,
                            contentType: req.file.mimetype
                        },
                        postedBy: user._id
                    });
                    await post.save();
                    return res
                        .status(200)
                        .json({
                            message: "Post added successfully"
                        });
                }
            })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                message: "Catch error in addPost"
            })
    }
}

const deletePost = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID).select("-password");
            const postToDelete = await Post.findById(req.params.postID);
            if (!postToDelete || postToDelete.postedBy.toString() !== user._id.toString()) {
                return res
                    .status(404)
                    .json({
                        message: "Post Not Found"
                    });
            }
            await Post.findByIdAndDelete(req.params.postID);
            return res
                .status(200)
                .json({
                    message: "Post deleted successfully"
                });
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Delete Post"
            })
    }
}

// Make this function to take proper data only from req.body
// const updatePost = async (req, res) => {
//     try {
//         isAuthenticated(req, res, async () => {
//             const user = await User.findById(req.session.userID).select("-password");
//             const postToUpdate = await Post.findById(req.params.postID);
//             if (!postToUpdate || postToUpdate.postedBy.toString() !== user._id.toString()) {
//                 return res
//                     .status(404)
//                     .json({
//                         message: "Post Not Found"
//                     })
//             }
//             req.body.updatedAt = myDateTime(new Date());
//             await Post.findByIdAndUpdate(req.params.postID, req.body);
//             await postToUpdate.save();
//             return res
//                 .status(200)
//                 .json({
//                     message: "Post Updated successfully"
//                 })
//         });
//     }
//     catch (err) {
//         return res
//             .status(500)
//             .json({
//                 error: err.name,
//                 message: err.message,
//                 path: "Update Post"
//             })
//     }
// }

const allPostsOfLoggedInUser = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const posts = await Post.find({ postedBy: req.session.userID }).select("-__v -_id").populate("postedBy", "name")
            const numOfPosts = posts.length;
            const user = await User.findById(req.session.userID).select("name email")
            return res
                .status(200)
                .json({
                    message: "All Posts Of Logged In User",
                    user: user,
                    numOfPosts: numOfPosts,
                    posts: posts
                })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "All Posts"
            })
    }
}

const allPostsOfOtherUsers = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const posts = await Post.find({ postedBy: req.params.userID }).select("-__v -_id");
            const numOfPosts = posts.length;
            const user = await User.findById(req.params.userID).select("name email")
            return res
                .status(200)
                .json({
                    message: "All Posts Of Other Users",
                    user: user,
                    numOfPosts: numOfPosts,
                    posts: posts
                })
        });
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "All Posts Of Other Users"
            })
    }
}

const allPostsOfFollowers = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            const user = await User.findById(req.session.userID).select("-password");
            const posts = await Post.find({ postedBy: user.following }).select("-__v -_id").populate("postedBy", "name")
            return res
                .status(200)
                .json({
                    message: "All Posts Of Followers",
                    posts: posts
                })
        })
    }
    catch (err) {
        return
        res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "All Posts Of Followers"
            })
    }
}


module.exports = {
    addPost,
    deletePost,
    // updatePost,
    allPostsOfLoggedInUser,
    allPostsOfOtherUsers,
    allPostsOfFollowers
}