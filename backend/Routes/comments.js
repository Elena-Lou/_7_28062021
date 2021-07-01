const express = require("express");

const router = express.Router();

const commentsCtrl = require("../Controllers/comments");

const auth = require("../Middleware/auth");
const multer = require("../Middleware/multer-config");

router.post("/:id/comment", auth, multer, commentsCtrl.addComment);
router.put("/:id/comments/:id", auth, multer, commentsCtrl.modifyComment);
router.delete("/:id/comments/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
