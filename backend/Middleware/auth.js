const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

//decodes encrypted token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "requête non authentifiée" });
  }
};
