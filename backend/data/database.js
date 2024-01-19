const mongoose = require("mongoose");
const { dbURL } = require("./../config/config");

const setUpDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB");
    } 
    catch (err) {
        console.log("Error Connecting to Database, " + err.message);
    }
};

module.exports = {
    setUpDB
};