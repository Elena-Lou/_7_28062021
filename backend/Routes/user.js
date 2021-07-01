const express = require("express");
const auth = require("../Middleware/auth");

const router = express.Router();

const userCtrl = require("../Controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user/:id", auth, userCtrl.viewUser);
router.delete("/user/:id", auth, userCtrl.deleteUser)


module.exports = router;
