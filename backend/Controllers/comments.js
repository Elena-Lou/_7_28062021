const jwt = require("jsonwebtoken");

const DB = require("../database_connection");

exports.addComment = (req, res, next) => {
  DB.query(
    `INSERT INTO comments (comment_text, comment_date, post_id, user_id) VALUES ( "${req.body.text}", NOW(), ${req.params.post_id}, ${req.body.user_id})`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });

      } else {
        res.status(201).json({ message: "commentaire publié !" });
      }
    }
  )};
 
exports.modifyComment = (req, res, next) => {
  DB.query(
    `UPDATE comments SET comment_text="${req.body.text}" WHERE comments.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });

      } else {
        res.status(200).json({ message: "commentaire mis à jour" });
      }
    }
  ); 
}; 

exports.deleteComment = (req, res, next) => {
  const userCommentId = DB.query(
    `SELECT user_id FROM comments WHERE comments.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(404).json({ error });
      }
  });

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

  if (userCommentId == userId || admin) {
    DB.query(
      `DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error });
        }
        else {
          return res.status(200).json({ message: "commentaire supprimé" });
        }
    });
  } else {
    res.status(400).json({message: "vous n'êtes pas autorisé à supprimer ce commentaire "});
}};   
 