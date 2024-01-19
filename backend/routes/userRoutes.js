const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const followController = require("../controllers/followController");

router.get("/", userController.getUser);
// router.put("/", userController.updateUser);

// Get Other User Details
router.get("/users/:userID", userController.getOtherUsers);
router.post("/users/:userID/follow", followController.follow);
router.delete("/users/:userID/unfollow", followController.unfollow);
// router.get("/users/:userID/suggestedfollowing", followController.suggestedFollowing);


module.exports = router;