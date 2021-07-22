const express = require("express");

const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./Routes/user");
const postsRoutes = require("./Routes/posts");
const commentsRoutes = require("./Routes/comments");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Message, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

//packages
app.use(express.json());
app.use(helmet());
app.use(cors());

//Routes
app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

module.exports = app;
