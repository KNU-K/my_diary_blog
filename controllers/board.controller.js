const boardService = require("../services/board.service");
const createBoard = async (req, res, next) => {
  try {
    const board = req.body;
    await boardService.create(board);
    res.send({ msg: "Successfully create board" });
  } catch (e) {
    next(e);
  }
};
const findBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const foundBoard = boardId
      ? await boardService.findBoardByBoardId(boardId)
      : await boardService.findAllBoard();
    res.send(foundBoard);
  } catch (e) {
    next(e);
  }
};
const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const updatedBoard = req.body;
    await boardService.updateBoardByBoardId(boardId, updatedBoard);
    res.send({ msg: "successfully update boards" });
  } catch (e) {
    next(e);
  }
};
const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    await boardService.deleteBoardByBoardId(boardId);
    res.send({ msg: "successfully delete board" });
  } catch (e) {
    next(e);
  }
};

module.exports = { createBoard, findBoard, updateBoard, deleteBoard };
