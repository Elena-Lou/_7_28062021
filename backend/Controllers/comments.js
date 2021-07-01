const DB = require("../database_connection");

exports.addComment = (req, res, next) => {
  DB.query(
    `INSERT INTO comments (comment_text, comment_date) VALUES ( '${req.body.text}, NOW())`, (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(201).json({ message: "commentaire publié !" });
    }
  );
};

exports.modifyComment = (req, res, next) => {
  DB.query(
    `UPDATE comments SET comment_text='${req.body.text}' WHERE comments.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ message: "commentaire mis à jour" });
    }
  );
};

exports.deleteComment = (req, res, next) => {
    const userCommentId = DB.query(`SELECT user_id FROM comments`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({ error });
        } res.status(200).json({ results })
    })

    const admin = DB.query(`SELECT * FROM users WHERE admin=1`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({ error });

        } res.status(200).json({ results })
    })

    //userId a definir ?? 
    
    if (userCommentId == userId || admin == 1 ){

        DB.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`,
              (error, results, fields) => {
                if (error) {
                  return res.status(500).json({ error });
                }
                res.status(200).json({ message: "commentaire supprimé" });
              }
            );
        } res.status(400).json({ message : "vous n'êtes pas autorisé à supprimer ce commentaire "})
    };