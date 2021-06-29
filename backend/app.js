const express = require("express");

const helmet = require("helmet");

// const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");

const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connect = {
  host: process.env.MYSQL_HOST,

  user: process.env.MYSQL_USER,

  password: process.env.MYSQL_PASSWORD,
};

const DB = mysql.createConnection(connect);

DB.connect(function (err) {
  if (err) throw err;
  console.log("Connectée à la base de données MySQL!");
});


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
// app.use('/api/auth', userRoutes);
// app.use('/api/posts', postRoutes);

module.exports = app;
