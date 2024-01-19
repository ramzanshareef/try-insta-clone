const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const postsRoutes = require("./postsRoutes");

const routesSetUp = () => {
    router.use("/api/v1/auth", authRoutes);
    router.use("/api/v1/user", userRoutes);
    router.use("/api/v1/user/posts", postsRoutes);
    return router;
}

module.exports = {
    routesSetUp
};