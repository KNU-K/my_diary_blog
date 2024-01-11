const {
  findComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = require("express").Router({ mergeParams: true });
/** mergeParams option isn't deleted in parent Param */

router.post("/", createComment);
router.get("/", findComment);
router.get("/:commentId", findComment);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);
module.exports = router;
