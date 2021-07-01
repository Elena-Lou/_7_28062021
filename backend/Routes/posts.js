const express = require("express");

const router = express.Router();

const postsCtrl = require("../Controllers/posts");

const auth = require("../Middleware/auth");
const multer = require("../Middleware/multer-config");

router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", auth, multer, postsCtrl.createPost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.modifyPost);
router.delete("/:id", auth, postsCtrl.deletePost);

module.exports = router;
