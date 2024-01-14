const { Board } = require("../models");

class BoardService {
  boards = [];
  constructor() {
    this.init()
      .then((boards) => {
        this.boards = boards;
      })
      .catch((e) => {
        throw e;
      });
  }
  async init() {
    try {
      const foundBoard = await Board.findAll();
      return foundBoard.map((board) => board.dataValues);
    } catch (e) {
      throw e;
    }
  }
  async create(board) {
    try {
      const createdBoard = Board.create(board);
      this.boards.push(createdBoard.dataValues);
      return createdBoard;
    } catch (e) {
      throw e;
    }
  }
  async findAllBoard() {
    try {
      return this.boards;
    } catch (e) {
      throw e;
    }
  }

  async findBoardByBoardId(boardId) {
    try {
      const foundBoard = this.boards.find((board) => board.b_id == boardId);
      if (!foundBoard) throw new Error("not found board");
      return foundBoard;
    } catch (e) {
      throw e;
    }
  }
  async updateBoardByBoardIdAndUserId(boardId, userId, board) {
    try {
      await Board.update(board, { where: { b_id: boardId, u_id: userId } });
      const updatedBoard = (await Board.findByPk(boardId)).dataValues;

      this.boards = this.boards.map((board) => {
        if (board.b_id === boardId) {
          return updatedBoard;
        }
        return board;
      });
    } catch (e) {
      throw e;
    }
  }
  async deleteBoardByBoardId(boardId, userId) {
    try {
      await Board.destroy({ where: { b_id: boardId, u_id: userId } });
      this.boards = this.boards.filter((board) => {
        board.b_id !== boardId;
      });
    } catch (e) {
      throw e;
    }
  }
}

const boardService = new BoardService();
module.exports = boardService;
