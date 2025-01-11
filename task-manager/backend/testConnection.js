const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/task-manager";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
