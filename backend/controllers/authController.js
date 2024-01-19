const { signUpValidation, passwordValidation } = require("../utils/inputValidation");
const { User } = require("../models/UserModel");
const { createHashedPassword, authenticateUser, verifyHashedPassword, logoutUser } = require("../utils/authentication");
const { sendMail } = require("../utils/mail");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const signup = async (req, res) => {
    try {
        if (req.session.userID) {
            return res
                .status(409)
                .json({
                    message: "Already logged in"
                });
        }
        const signupDataErrors = await signUpValidation(req);
        if (!signupDataErrors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: signupDataErrors.array()
                });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }
        if (!passwordValidation(req)) {
            return res
                .status(422)
                .json({
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                });
        }
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: createHashedPassword(req),
        });
        await user.save();
        // authenticateUser(req, user);
        // sendMail(req.body.email);
        return res
            .status(200)
            .json({
                message: "SignUp Success"
            });
    }
    catch (err) {
        logoutUser(req);
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Signup"
            });
    }
}

const login = async (req, res) => {
    try {
        if (req.session.userID) {
            return res
                .status(409)
                .json({
                    message: "Already logged in"
                });
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Incorect Credentials" });
        }
        if (!verifyHashedPassword(req, user)) {
            return res
                .status(401)
                .json({ message: "Incorect Credentials" });
        }
        authenticateUser(req, user)
        user = await User.findById(req.session.userID).select("-password -__v -_id");
        return res
            .status(200)
            .json({
                message: "Login Success"
            });
    }
    catch (err) {
        logoutUser(req);
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "Login"
            });
    }
}

const logout = async (req, res) => {
    isAuthenticated(req, res, () => {
        try {
            logoutUser(req)
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            message: "Logout Success!"
                        });
                })
        }
        catch (err) {
            return res
                .status(500)
                .json({
                    error: err.name,
                    message: err.message,
                    path: "Logout"
                });
        }
    });
}

const isAuth = async (req, res) => {
    try {
        if (req.session.userID) {
            return res
                .status(200)
                .json({
                    message: "Authenticated"
                });
        }
        else {
            return res
                .status(401)
                .json({
                    message: "Unauthenticated"
                });
        }
    }
    catch (err) {
        return res
            .status(500)
            .json({
                error: err.name,
                message: err.message,
                path: "isAuthenticated"
            });
    }
}

module.exports = {
    signup,
    login,
    logout,
    isAuth
}