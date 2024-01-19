const {
  createBoard,
  findBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router();

router.post("/", guardMiddleware, createBoard);
router.get("/", findBoard);
router.get("/:boardId", findBoard);
router.put("/:boardId", guardMiddleware, updateBoard);
router.delete("/:boardId", guardMiddleware, deleteBoard);
module.exports = router;
