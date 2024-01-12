const commentService = require("../services/comment.service");

const createComment = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const comment = req.body;
    await commentService.createByBoardId(boardId, {
      u_id: req.user.u_id,
      ...comment,
    });
    res.send({ msg: "Successfully create comment" });
  } catch (e) {
    next(e);
  }
};
const findComment = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    const foundComment = commentId
      ? commentService.findCommentByBoardIdAndCommentId(boardId, commentId)
      : commentService.findCommentByBoardIdAndCommentId(commentId);
    res.send(foundComment);
  } catch (e) {
    next(e);
  }
};
const updateComment = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    const updatedComment = req.body;
    await commentService.updateCommentByBoardIdAndCommentId(
      boardId,
      commentId,
      {
        u_id: req.user.u_id,
        ...updatedComment,
      }
    );
    res.send({ msg: "successfully update comment" });
  } catch (e) {
    next(e);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    await commentService.deleteCommentByBoardIdAndCommentIdAndUserId(
      boardId,
      commentId,
      req.user.u_id
    );
    res.send({ msg: "successfully delete comment" });
  } catch (e) {
    next(e);
  }
};
module.exports = { createComment, findComment, updateComment, deleteComment };
