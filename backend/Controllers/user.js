const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maskData = require("maskdata");

const DB = require("../database_connection");

const dotenv = require("dotenv");
dotenv.config();

//create user, mask email for RGPD and encrypt password
exports.signup = (req, res, next) => {
  DB.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`,
    (error, results, fields) => {
      if (results.length > 0) {
        res.status(401).json({ message: "email déjà utilisé" });
      } else {
        bcrypt
          .hash(req.body.password, 10)

          .then((encryptedPassword) => {
            const email = maskData.maskEmail2(req.body.email);

            DB.query(
              `INSERT INTO users (email, name, password) VALUES ('${email}', '${req.body.name}', '${encryptedPassword}')`,
              (error, results, fields) => {
                if (error) {
                  return res.status(400).json({ error });
                } else {
                  res.status(201).json({ message: "utilisateur créé" });
                }
              }
            );
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

//compares emails and encrypted passwords
exports.login = (req, res, next) => {
  const email = maskData.maskEmail2(req.body.email);
  DB.query(
    `SELECT * FROM users WHERE email = "${email}"`,
    (error, results, fields) => {
      if (error) {
        return res.status(500).json(error.message);
      }

      results = JSON.parse(JSON.stringify(results));

      if (results[0]) {
        bcrypt
          .compare(req.body.password, results[0].password)

          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: "mot de passe erronné" });
            }
            //sends user's data and encrypts user id and admin role into a token
            res.status(200).json({
              user: {...results[0]},
              token: jwt.sign(
                { userId: results[0].id, admin: results[0].admin },
                process.env.TOKEN,
                {
                  expiresIn: "24h",
                }
              ),
            });
          })

          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "utilisateur inconnu" });
      }
    }
  );
};

//accesses user's profile
exports.getProfile = (req, res, next) => {
  DB.query(
    `SELECT * FROM users WHERE users.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(404).json({ message: "utilisateur inconnu" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

//deletes user's profile
exports.deleteProfile = (req, res, next) => {
  DB.query(
    `DELETE FROM users WHERE users.id = ${req.params.id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        res.status(200).json({ message: "utilisateur supprimé" });
      }
    }
  );
};
