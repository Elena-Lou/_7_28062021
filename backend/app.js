const express = require("express");

const helmet = require("helmet");

const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");
const connect = {
  host: "localhost",

  user: process.env.MYSQL_USER,

  password: process.env.MYSQL_PASSWORD,
};

const db = mysql.createConnection(connect);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connectée à la base de données MySQL!");
});

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(express.json());
app.use(helmet());

module.exports = app;
