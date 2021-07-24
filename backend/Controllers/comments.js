const jwt = require("jsonwebtoken");

const DB = require("../database_connection");

//check whether user is admin
function isAdmin(userId) {
  return new Promise((resolve) => {
    const admin = DB.query(
      `SELECT * FROM users WHERE admin=1 AND id=${userId}`,
      (error, results, fields) => resolve(results.length)
    );
  })
};

exports.addComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;
  
  DB.query(
    `INSERT INTO comments (text, date, postId, userId) VALUES ( "${req.body.text}", NOW(), ${req.params.postId}, ${userId})`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        res.status(201).json({ message: "commentaire publié !" });
      }
    }
  );
};

exports.getAllComments = (req, res, next) => {
  DB.query(
    `SELECT users.name, comments.id, comments.userId, comments.postId, comments.text, comments.date AS date FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.postId} ORDER BY date DESC`,
    (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        res.status(200).json(results);
        console.log(results);
      }
    }
  );
};

exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  //needs to wait for isAdmin() to be completed
  let admin = await isAdmin(userId);
  //check if current user is the author OR if is admin
  if (admin) {
    DB.query(
      `DELETE FROM comments WHERE comments.id = ${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({ message: "commentaire supprimé" });
        }
      }
    );
  } else {
    DB.query(
      `DELETE FROM posts WHERE comments.id = ${req.params.id} AND comments.userId = ${userId}`,
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({ message: "commentaire supprimé" });
        }
      }
    );
  }
};
 