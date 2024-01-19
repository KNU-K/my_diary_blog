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
      ? await commentService.findCommentByBoardIdAndCommentId(
          boardId,
          commentId
        )
      : await commentService.findCommentByBoardId(boardId);
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

const createReply = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("isn't already login");
    const { boardId, commentId } = req.params;
    const { r_content } = req.body;

    await commentService.createReplyUsingCommentId(
      req.user.u_id,
      boardId,
      commentId,
      r_content
    );

    res.send({ msg: "successfully create reply of comment" });
  } catch (e) {
    next(e);
  }
};

const findAllReply = async (req, res, next) => {
  try {
    const { boardId, commentId } = req.params;
    const foundReplies = await commentService.findAllReplyByBoardIdAndCommentId(
      boardId,
      commentId
    );
    console.log(foundReplies);
    res.send(foundReplies);
  } catch (e) {
    next(e);
  }
};

const updateReply = async (req, res, next) => {
  try {
    const { boardId, commentId, replyId } = req.params;
    const { r_content } = req.body;
    if (!req.user) throw new Error("isn't already login");
    if ((await commentService.findUserByReplyId(replyId)) != req.user.u_id)
      throw new Error("isn't matched user");
    await commentService.updateReplyByBoardIdAndCommentIdAndReplyId(
      boardId,
      commentId,
      replyId,
      r_content
    );
    res.send({ msg: "successfully update reply of comment" });
  } catch (e) {
    next(e);
  }
};
const deleteReply = async (req, res, next) => {
  try {
    const { boardId, commentId, replyId } = req.params;
    if (!req.user) throw new Error("isn't already login");
    if ((await commentService.findUserByReplyId(replyId)) != req.user.u_id)
      throw new Error("isn't matched user");
    await commentService.deleteReplyByBoardIdAndCommentIdAndReplyId(
      boardId,
      commentId,
      replyId
    );
    res.send({ msg: "successfully delete reply of comment" });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  createComment,
  findComment,
  updateComment,
  deleteComment,
  createReply,
  findAllReply,
  updateReply,
  deleteReply,
};
