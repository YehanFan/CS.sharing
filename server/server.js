const express = require("express");

const cors = require("cors");
const config = require("./config/config");

const connectToDatabase = require("./config/db");
const initializeSocket = require("./config/socket");
const errorHandler = require("./middleware/errorHandler");

connectToDatabase();

const app = express();
const server = require('http').createServer(app);
const port = config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

initializeSocket(app, server)

// Authorization Route
app.use("/api/auth", require("./routes/auth"));
console.log("app.use /api/auth")

// Posts route
app.use("/api/posts", require("./routes/posts"));

// Comments route
app.use("/api/comments", require("./routes/comments"))

// Reading Lists route
app.use("/api/reading-lists", require("./routes/readingLists"))

// Newsfeed route
app.use("/api/newsfeed", require("./routes/newsfeed"))

// Search route
app.use("/api/search", require("./routes/search"))

// User route
app.use("/api/users", require("./routes/users"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
