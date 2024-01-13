const {
  findComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router({ mergeParams: true });
/** mergeParams option isn't deleted in parent Param */

router.post("/", guardMiddleware, createComment);
router.get("/", findComment);
router.get("/:commentId", findComment);
router.put("/:commentId", guardMiddleware, updateComment);
router.delete("/:commentId", guardMiddleware, deleteComment);
module.exports = router;
