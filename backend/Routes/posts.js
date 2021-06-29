const express = require("express");

const router = express.Router();

const saucesCtrl = require("../Controllers/posts");

const auth = require("../Middleware/auth");
const multer = require("../Middleware/multer-config");

router.get("/", auth, saucesCtrl.getAllPosts);
router.post("/", auth, multer, saucesCtrl.createPost);
router.get("/:id", auth, saucesCtrl.getOnePost);
router.put("/:id", auth, multer, saucesCtrl.modifyPost);
router.delete("/:id", auth, saucesCtrl.deletePost);

module.exports = router;
