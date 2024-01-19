// models/index.js
const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const ProfileModel = require("./profile");
const BoardModel = require("./board");
const CommentModel = require("./comment");
const FollowModel = require("./follow");
const ReplyModel = require("./reply");
const sequelize = new Sequelize("blog_exam", "root", "root", {
  dialect: "mysql",
});

const User = UserModel(sequelize);
const Board = BoardModel(sequelize);
const Comment = CommentModel(sequelize);
const Profile = ProfileModel(sequelize);
const Follow = FollowModel(sequelize);
const Reply = ReplyModel(sequelize);

User.associate({ Board, Comment, Profile, Follow, Reply });
Board.associate({ User, Comment, Reply });
Comment.associate({ User, Board, Reply });
Follow.associate({ User });
Profile.associate({ User });
Reply.associate({ User, Comment, Board });
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
  Reply,
};
