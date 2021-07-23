const DB = require("../database_connection");
const jwt = require("jsonwebtoken");

//check whether user is admin
function isAdmin(userId) {
  return new Promise((resolve) => {
    const admin = DB.query(
      `SELECT * FROM users WHERE admin=1 AND id=${userId}`,
      (error, results, fields) => resolve(results.length)
    );
  })
};

//get user id from token to include into posts table
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  DB.query(
    `INSERT INTO posts (title, text, date, userId) VALUES ('${req.body.title}', '${req.body.text}', NOW(), ${userId})`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(201).json({ message: "publiée !" });
      }
    }
  );
};

//one post with it's id
exports.getOnePost = (req, res, next) => {
  DB.query(
    `SELECT * FROM posts WHERE posts.id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        return res.status(404).json({ error });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

//joint query to get post's user's name
exports.getAllPosts = (req, res, next) => {
  DB.query(`SELECT users.name, posts.id, posts.userId, posts.title, posts.text, posts.date AS date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY date DESC`, (error, results) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      res.status(200).json(results);
    }
  });
};

//get the post's author(user) id
exports.deletePost = async (req, res, next) => {
  const userPostId = DB.query(
    `SELECT userId FROM posts WHERE posts.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(404).json({ error });
      }
    }
  );
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  //needs to wait for isAdmin() to be completed
  let admin = await isAdmin(userId);

  //check if current user is the author OR if is admin
  if (userPostId == userId || admin) {
    DB.query(
      `DELETE FROM posts WHERE posts.id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({ message: "publication supprimée" });
        }
      }
    );
  } else {
    res.status(400).json({
      message: "vous n'êtes pas autorisé à supprimer cette publication ",
    });
  }
};
