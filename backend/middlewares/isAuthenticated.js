const { logoutUser } = require("../utils/authentication")

const isAuthenticated = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        logoutUser(req)
            .then(() => {
                return res.status(401).json({ message: "Please Login to continue!" });
            })
    }
    else {
        next();
        return;
    }
}

module.exports = {
    isAuthenticated
};