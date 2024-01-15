const { Comment, Reply } = require("../models");

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
      const foundComment = await Comment.findAll({
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
  async createReplyUsingCommentId(userId, boardId, commentId, content) {
    try {
      await Reply.create({
        u_id: userId,
        b_id: boardId,
        c_id: commentId,
        r_content: content,
      });
    } catch (e) {
      throw e;
    }
  }
  async findUserByReplyId(replyId) {
    try {
      const foundData = await Reply.findByPk(replyId);
      return foundData.u_id;
    } catch (e) {
      throw e;
    }
  }
  async findAllReplyByBoardIdAndCommentId(boardId, commentId) {
    try {
      const foundReply = await Reply.findAll({
        where: {
          b_id: boardId,
          c_id: commentId,
        },
      });
      return foundReply;
    } catch (e) {
      throw e;
    }
  }
  async updateReplyByBoardIdAndCommentIdAndReplyId(
    boardId,
    commentId,
    replyId,
    content
  ) {
    try {
      await Reply.update(content, {
        where: {
          b_id: boardId,
          c_id: commentId,
          r_id: replyId,
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async deleteReplyByBoardIdAndCommentIdAndReplyId(
    boardId,
    commentId,
    replyId
  ) {
    try {
      await Reply.destroy({
        where: {
          b_id: boardId,
          c_id: commentId,
          r_id: replyId,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
const commentService = new CommentService();

module.exports = commentService;
