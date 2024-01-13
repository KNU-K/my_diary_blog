const boardService = require("../services/board.service");
const createBoard = async (req, res, next) => {
  try {
    const board = req.body;
    await boardService.create({ u_id: req.user.u_id, ...board });
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
    await boardService.updateBoardByBoardIdAndUserId(
      boardId,
      req.user.u_id,
      updatedBoard
    );
    res.send({ msg: "successfully update boards" });
  } catch (e) {
    next(e);
  }
};
const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    await boardService.deleteBoardByBoardId(boardId, req.user.u_id);
    res.send({ msg: "successfully delete board" });
  } catch (e) {
    next(e);
  }
};

module.exports = { createBoard, findBoard, updateBoard, deleteBoard };
