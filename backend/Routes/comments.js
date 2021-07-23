const express = require("express");

const router = express.Router();

const commentsCtrl = require("../Controllers/comments");

const auth = require("../Middleware/auth");

router.get("/:postId", auth, commentsCtrl.getAllComments)
router.post("/:postId", auth, commentsCtrl.addComment);
router.delete("/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
  