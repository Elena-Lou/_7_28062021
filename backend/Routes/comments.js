const express = require("express");

const router = express.Router();

const commentsCtrl = require("../Controllers/comments");

const auth = require("../Middleware/auth");


router.post("/:post_id", auth, commentsCtrl.addComment);
router.put("/:id", auth, commentsCtrl.modifyComment);
router.delete("/:id", auth, commentsCtrl.deleteComment);

module.exports = router;
  