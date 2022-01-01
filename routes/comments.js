const express = require("express");
const router = express.Router();
const { addComment, getCommentsOfPost } = require("../handlers/comments");
const { loginRequired } = require("../middlewares/auth");
router.get("/:productId", getCommentsOfPost);
router.post("/:productId", loginRequired, addComment);
module.exports = router;
