// models/index.js
const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const ProfileModel = require("./profile");
const BoardModel = require("./board");
const CommentModel = require("./comment");
const FollowModel = require("./follow");

const sequelize = new Sequelize("blog_exam", "root", "root", {
  dialect: "mysql",
});

const User = UserModel(sequelize);
const Board = BoardModel(sequelize);
const Comment = CommentModel(sequelize);
const Profile = ProfileModel(sequelize);
const Follow = FollowModel(sequelize);

User.associate({ Board, Comment, Profile, Follow });
Board.associate({ User, Comment });
Comment.associate({ User, Board });
Follow.associate({ User });
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully.");
});

module.exports = {
  sequelize,
  User,
  Board,
  Comment,
  Follow,
  Profile,
};
