const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");
const likesController = require("../controllers/likesController");

// Add, Delete, Update Post
router.post("/addPost", postController.addPost);
router.delete("/deletePost/:postID", postController.deletePost);
// router.put("/updatePost/:postID", postController.updatePost);

// Like, Unlike Post
router.get("/:postID/likes", likesController.allLikes);
router.post("/:postID/like", likesController.likePost);
router.delete("/:postID/unlike", likesController.unlikePost);

// Get All Posts
router.get("/allPosts", postController.allPostsOfLoggedInUser);
router.get("/allPosts/:userID", postController.allPostsOfOtherUsers);
router.get("/allPostsOfFollowers", postController.allPostsOfFollowers);



module.exports = router;