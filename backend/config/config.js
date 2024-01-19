const cors = require("cors");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const frontendURL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
const dbURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/project"
const port = process.env.PORT || 5000;

const corsConfig = cors({
    origin: frontendURL,
    credentials: true
});


const sesionStore = new MongoDBStore({
    uri: dbURL,
    collection: "user-sessions"
});
const sessionConfig = session({
    secret: process.env.SESSION_SECRET || "this is a secret",
    resave: false,
    saveUninitialized: false,
    store: sesionStore
});

const jsonContentConfig = express.json();

const setUpConfig = (app) => {
    app.use(corsConfig);
    app.use(sessionConfig);
    app.use(jsonContentConfig);
};

module.exports = {
    setUpConfig,
    port,
    dbURL
}