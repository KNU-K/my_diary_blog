const {
  findComment,
  createComment,
  updateComment,
  deleteComment,
  deleteReply,
  updateReply,
  findAllReply,
  createReply,
} = require("../controllers/comment.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router({ mergeParams: true });
/** mergeParams option isn't deleted in parent Param */

router.post("/", guardMiddleware, createComment);
router.get("/", findComment);
router.get("/:commentId", findComment);
router.put("/:commentId", guardMiddleware, updateComment);
router.delete("/:commentId", guardMiddleware, deleteComment);

/** @reply **/
router.post("/:commentId/reply", guardMiddleware, createReply);
router.get("/:commentId/reply", findAllReply);
router.put("/:commentId/reply/:replyId", guardMiddleware, updateReply);
router.delete("/:commentId/reply/:replyId", guardMiddleware, deleteReply);
module.exports = router;
