const DB = require("../database_connection");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  DB.query(
    `INSERT INTO posts (post_title, post_text, post_date, user_id) VALUES ("${req.body.title}", "${req.body.text}", NOW(), ${userId})`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        console.log(req.body);
        return res.status(201).json({ message: "publiée !" });
      }
    }
  );
};

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

exports.getAllPosts = (req, res, next) => {
  DB.query(`SELECT * FROM posts ORDER BY post_date DESC`, (error, results) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
};

exports.deletePost = (req, res, next) => {
  const userPostId = DB.query(
    `SELECT user_id FROM posts WHERE posts.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(404).json({ error });
      }
    }
  );

  //userId a definir a partir du token
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  let isAdmin = 1;
  const admin = DB.query(
    `SELECT * FROM users WHERE admin=1 AND id=${userId}`,
    (error, results, fields) => {
      if (error || !results) {
        isAdmin = 0;
      }
    }
  );

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
