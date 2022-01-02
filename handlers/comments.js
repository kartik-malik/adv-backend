const Comment = require("../models/comments");
const user = require("../models/user");
exports.addComment = async function (req, res, next) {
  const text = req.body.text;
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    const comment = await Comment.create({ text, userId, productId });
    res.send({ comment });
  } catch (err) {
    next(err);
  }
};
exports.getCommentsOfPost = async function (req, res, next) {
  const productId = req.params.productId;
  try {
    const comments = await Comment.findAll({
      where: { productId },
      include: user,
    });
    console.log({ comments });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};
