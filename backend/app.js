const express = require("express");

const helmet = require("helmet");

const userRoutes = require("./Routes/user");
const postsRoutes = require("./Routes/posts");
const commentsRoutes = require("./Routes/comments");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS");

  next();
}); 

app.use(express.json());
app.use(helmet());

// app.use("/images", express.static(path.join(__dirname, "images")));

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

module.exports = app;
