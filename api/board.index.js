const {
  createBoard,
  findBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");

const router = require("express").Router();

router.post("/", createBoard);
router.get("/", findBoard);
router.get("/:boardId", findBoard);
router.put("/:boardId", updateBoard);
router.delete("/:boardId", deleteBoard);
module.exports = router;
