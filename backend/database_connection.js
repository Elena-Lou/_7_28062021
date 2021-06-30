const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connect = {
  host: process.env.MYSQL_HOST,

  user: process.env.MYSQL_USER,

  password: process.env.MYSQL_PASSWORD,

  database: process.env.MYSQL_DATABASE
};

const DB = mysql.createConnection(connect);

DB.connect(function (err) {
  if (err) throw err;
  console.log("Connectée à la base de données MySQL!");
});

module.exports = DB;