const { Board } = require("../models");

class BoardService {
  constructor() {}
  async create(board) {
    try {
      const createdBoard = Board.create(board);
      return createdBoard;
    } catch (e) {
      throw e;
    }
  }
  async findAllBoard() {
    try {
      const foundBoard = await Board.findAll();
      return foundBoard;
    } catch (e) {
      throw e;
    }
  }

  async findBoardByBoardId(boardId) {
    try {
      const foundBoard = (await Board.findByPk(boardId)).dataValues;
      return foundBoard;
    } catch (e) {
      throw e;
    }
  }
  async updateBoardByBoardId(boardId, board) {
    try {
      await Board.update(board, { where: { b_id: boardId } });
    } catch (e) {
      throw e;
    }
  }
  async deleteBoardByBoardId(boardId) {
    try {
      await Board.destroy({ where: { b_id: boardId } });
    } catch (e) {
      throw e;
    }
  }
}

const boardService = new BoardService();
module.exports = boardService;
