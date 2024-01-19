const isAuthenticated = require("../middlewares/isAuthenticated");
const { User } = require("../models/UserModel");
const { createUserStorage } = require("../utils/mediaHandler");

const uploadImage = async (req, res) => {
    isAuthenticated(req, res, async () => {
        const user = await User.findById(req.session.userID).select("-password");
        createUserStorage(user.username)(req, res, async (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({
                        error: err.name,
                        message: err.message,
                        path: "Upload Image"
                    })
            }
            else {
                return res
                    .status(200)
                    .json({
                        message: "Image uploaded successfully"
                    })
            }
        })
    })
}