const DB = require("../database_connection");


exports.createPost = (req, res, next) => {
        DB.query(`INSERT INTO posts (post_title, post_text, post_image, post_date) VALUES ( '${req.body.title}', '${req.body.text}', '${req.body.imageURL}', NOW())`, (error, results, fields) => {
            if (error) {
                return res.status(400).json({ error }); 

            } res.status(201).json({ message : 'publiée !'});

        }) 
};

exports.getOnePost = (req, res, next) => {
    DB.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            return res.status(404).json({ error });

        } res.status(200).json(results);
    })
};

exports.getAllPosts = (req, res, next) => {
    DB.query(`SELECT * FROM posts ORDER BY post_date DESC`, (error, results, fields) => {
        if (error) {
            return res.status(400).json({ error });

        } res.status(200).json(results);
    })
};

exports.modifyPost = (req, res, next) => {
    DB.query(`UPDATE posts SET title='${req.body.title}', post_text='${req.body.text}', post_image='${req.body.imageURL}' WHERE posts.id = ${req.params.id}`, (error, results, fields) => {
         if (error) {
            return res.status(400).json({ error });

        } res.status(200).json({ message : "publication mise à jour" });
    })
};

exports.deletePost = (req, res, next) => {
    DB.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, results, fields) => {
        if (error) {
            return res.status(500).json({ error });

        } res.status(200).json({ message : "publication supprimée" });
    })
};