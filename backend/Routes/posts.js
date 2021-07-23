const express = require("express");

const router = express.Router();

const postsCtrl = require("../Controllers/posts");

const auth = require("../Middleware/auth");

//router post paths
router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", auth, postsCtrl.createPost);
router.put("/:id", auth, postsCtrl.modifyPost)
router.get("/:id", auth, postsCtrl.getOnePost);
router.delete("/:id", auth, postsCtrl.deletePost);

module.exports = router;
