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
    `INSERT INTO comments (text, date, postId, userId) VALUES ( "${req.body.text}", NOW(), ${req.params.id}, ${userId})`,
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
    `SELECT users.name, comments.userId, comments.postId, comments.text, comments.date AS date FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY date DESC`,
    (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        res.status(200).json(results);
      }
    }
  );
};
 
exports.modifyComment = (req, res, next) => {
  DB.query(
    `UPDATE comments SET text="${req.body.text}" WHERE comments.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });

      } else {
        res.status(200).json({ message: "commentaire mis à jour" });
      }
    }
  ); 
}; 

exports.deleteComment = async (req, res, next) => {
  const userCommentId = DB.query(
    `SELECT userId FROM comments WHERE comments.id = ${req.params.id}`,
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

  if (userCommentId == userId || admin) {
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
    res
      .status(400).json({
        message: "vous n'êtes pas autorisé à supprimer ce commentaire ",
      });
  }
};   
 