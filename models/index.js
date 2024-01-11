// models/index.js
const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const BoardModel = require("./board");
const CommentModel = require("./comment");

const sequelize = new Sequelize("blog_exam", "root", "root", {
  dialect: "mysql",
});

const User = UserModel(sequelize);
const Board = BoardModel(sequelize);
const Comment = CommentModel(sequelize);

User.associate({ Board, Comment });
Board.associate({ User, Comment });
Comment.associate({ User, Board });

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced successfully.");
});

module.exports = {
  sequelize,
  User,
  Board,
  Comment,
};
