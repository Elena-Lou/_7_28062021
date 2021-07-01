const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("../database_connection");

const dotenv = require("dotenv");
dotenv.config();

//creation d'utilisateur et cryptage du mot de passe
exports.signup = (req, res, next) => {
    DB.query(`SELECT * FROM users WHERE email = ${req.body.email}`, (error, results, fields) => {
      if (results.length > 0 ) {
        res.status(401).json({ message : "email déjà utilisé"});

      } else { 

        bcrypt.hash(req.body.password, 10)
        
        .then((encryptedPassword) => {
          DB.query(`INSERT INTO users (email, name, password) VALUES ('${req.body.email}', '${req.body.name}', '${encryptedPassword}')`, (error, results, fields) => {
          if (error) {
            return res.status(400).json({ error })

          } res.status(201).json({ message: "utilisateur crée" })
          })
        });
      }}
      )};

//comparaison des mots de passe cryptés, encodage de l'userId dans un jeton
exports.login = (req, res, next) => {
  DB.query(`SELECT * FROM users WHERE email = ${req.body.email}`, (error, results, fields) => {
    if (results.length > 0 ) {
      bcrypt.compare(req.body.password, results[0].password)

      .then(valid => {
        if(!valid) {
          return res.status(401).json({message : "mot de passe erronné"});

        } res.status(200).json({
          userId: results[0].id,
          name: results[0].name,
          token: jwt.sign(
            {userId: results[0].id},
            process.env.TOKEN,
            {expiresIn: "24h"}
          )        
          });
        })
        .catch(error => res.status(500).json({ error }));

      } res.status(404).json({ message: "utilisateur inconnu" });
  });
};

//acces au profil utlisateur 
exports.viewUser = (req, res, next) => {
  DB.query(`SELECT * FROM users WHERE users.id = ${req.params.id}`, (error, results, fields) => {

    if (error) {
      return res.status(404).json({ message : "utilisateur inconnu" });

    } res.status(200).json(results);
  });
}

//suppression du profil utilisateur
exports.deleteUser = (req, res, next) => {
    DB.query(`DELETE FROM users WHERE users.id = ${req.params.id}`, (error, results, fields) => {

      if (error) {
        return res.status(400).json({ error });

      } res.status(200).json(results);
    });
};
