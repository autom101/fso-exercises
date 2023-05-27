// Import libraries
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import middleware
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

// Connect to mongoose
mongoose.set("strictQuery", false);
logger.informationLog(`Connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI);

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./build"));

// Route handling and error handling middleware
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;