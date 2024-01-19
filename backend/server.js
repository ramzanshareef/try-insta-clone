const express = require("express");
const { setUpConfig, port } = require("./config/config");
const { setUpDB } = require("./data/database");
const { globalErrorHandler, uncaughtExceptionHandler } = require("./utils/errorHandler");
const { routesSetUp } = require("./routes/allRoutes");
const app = express();

try {
    setUpConfig(app);
    app.use(routesSetUp());
    uncaughtExceptionHandler();
    app.listen(port, () => {
        console.log(`Connected Server at Port = ${port}`);
        setUpDB();
    });
    app.use(globalErrorHandler);
} 
catch (err) {
    console.log("Error Occured, " + err.message);
}