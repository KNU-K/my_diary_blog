const { Comment } = require("../models");

class CommentService {
  constructor() {}
  async createByBoardId(boardId, comment) {
    try {
      const newComment = { b_id: boardId, ...comment };
      const createdComment = await Comment.create(newComment);
      return createdComment;
    } catch (e) {
      throw e;
    }
  }
  async findCommentByBoardIdAndCommentId(boardId, commentId) {
    try {
      const foundComment = Comment.findAll({
        where: {
          id: commentId,
          b_id: boardId,
        },
      });
      return foundComment;
    } catch (e) {
      throw e;
    }
  }
  async findCommentByBoardId(boardId) {
    try {
      const foundComment = await Comment.findAll({
        where: {
          b_id: boardId,
        },
      });
      return foundComment;
    } catch (e) {
      throw e;
    }
  }
  async updateCommentByBoardIdAndCommentId(boardId, commentId, comment) {
    try {
      await Comment.update(comment, {
        where: { id: commentId, b_id: boardId },
      });
    } catch (e) {
      throw e;
    }
  }
  async deleteCommentByBoardIdAndCommentIdAndUserId(
    boardId,
    commentId,
    userId
  ) {
    try {
      await Comment.destroy({
        where: { id: commentId, b_id: boardId, u_id: userId },
      });
    } catch (e) {
      throw e;
    }
  }
}
const commentService = new CommentService();

module.exports = commentService;
