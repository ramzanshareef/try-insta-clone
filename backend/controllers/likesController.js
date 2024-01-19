const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { Post } = require("../models/PostModel");

const likePost = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            let post = await Post.findById(req.params.postID);
            if (!post) {
                return res
                    .status(404)
                    .json({
                        message: "Post Not Found"
                    })
            }
            if (!post.likedBy.includes(req.session.userID)) {
                post.likedBy.push(req.session.userID);
                post.likes++;
                await post.save();
                return res
                    .status(200)
                    .json({
                        message: "Post liked successfully",
                        post: post
                    })
            }
            else {
                return res
                    .status(201)
                    .json({
                        message: "Post already liked"
                    })
            }
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Like Post"
            })
    }
}

const unlikePost = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            let post = await Post.findById(req.params.postID);
            if (!post) {
                return res
                    .status(404)
                    .json({
                        message: "Post Not Found"
                    })
            }
            if (post.likedBy.includes(req.session.userID)) {
                post.likedBy.pull(req.session.userID);
                post.likes--;
                await post.save();
                return res
                    .status(200)
                    .json({
                        message: "Post unliked successfully",
                        post: post
                    })
            }
            else {
                return res
                    .status(201)
                    .json({
                        message: "Post not liked"
                    })
            }
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Unlike Post"
            })
    }
}

const allLikes = async (req, res) => {
    try {
        isAuthenticated(req, res, async () => {
            let post = await Post.findById(req.params.postID).populate("likedBy postedBy", "-_id name email").select("likes likedBy");
            if (!post) {
                return res
                    .status(404)
                    .json({
                        message: "Post Not Found"
                    })
            }
            return res
                .status(200)
                .json({
                    message: "All Likes",
                    post: post
                })
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "All Likes"
            })
    }
}

module.exports = {
    likePost,
    unlikePost,
    allLikes
}